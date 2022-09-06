import { Component, OnInit } from '@angular/core';
import { HomeStore } from '../../data-access/home.store';
import { Store } from '@ngrx/store';
import * as catsAction from '../../../shell/data-access/cats.action';
import { RandomImage } from '../../../shell/utils/randomImage.interface';
import { of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  // images$ = this.store.select(selectRandomImages);
  images$ = of([]);

  ngOnInit(): void {
    // this.store.getImages(10);
  }

  like(imgId: string) {
    // this.store.dispatch(catsAction.likeImage({ imageId: imgId }));
  }
  dislike(imgId: string) {
    // this.store.dispatch(catsAction.dislikeImage({ imageId: imgId }));
  }
  undo(voteId: number) {
    // this.store.dispatch(catsAction.removeVote({ voteId }));
  }

  trackById(index: number, image: RandomImage) {
    return image.imageId;
  }
  favorite(imageId: string) {
    // this.store.dispatch(catsAction.switchFavoriteImage({ imageId }));
  }
}
