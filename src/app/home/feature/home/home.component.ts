import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPhotos } from '../../data-access/home.action';
import { selectImages } from '../../data-access/home.selector';
import { RandomImage } from '../../utils/randomImage.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  images$ = this.store.select(selectImages);

  ngOnInit(): void {
    this.store.dispatch(loadPhotos());
  }

  trackById(index: number, image: RandomImage) {
    return image.imageId;
  }
}
