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
import { loadPhotos } from '../../data-access/home.action';
import { selectImages } from '../../data-access/home.selector';
import { RandomImage } from '../../utils/randomImage.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private store: Store, private ngZone: NgZone) {}
  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.store.dispatch(loadPhotos());
        });
      });
  }

  images$ = this.store.select(selectImages);

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.store.dispatch(loadPhotos());
  }

  trackById(index: number, image: RandomImage) {
    return image.imageId;
  }
}
