import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import {
  loadBreeds,
  loadCategories,
  loadPhotos,
} from '../../data-access/home.action';
import { selectImages, selectIsLoading } from '../../data-access/home.selector';
import { HomeImage } from '../../utils/randomImage.interface';
import { resetRandomImages } from '../../data-access/home.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  images$ = this.store.select(selectImages);
  isLoading$ = this.store.select(selectIsLoading);

  ngOnInit(): void {
    this.store.dispatch(resetRandomImages());
    this.store.dispatch(loadPhotos());
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadBreeds());
  }

  constructor(private store: Store, private ngZone: NgZone) {}

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 2000),
        throttleTime(2000)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.store.dispatch(loadPhotos());
        });
      });
  }

  trackById(index: number, image: HomeImage) {
    return image.imageId;
  }
}
