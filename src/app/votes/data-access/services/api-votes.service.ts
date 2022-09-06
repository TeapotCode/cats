import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { voteImages } from '../../utilities/votesImages.model';

@Injectable({
  providedIn: 'root',
})
export class ApiVotesService {
  constructor(private store: Store) {}

  // getVotedImagesWithFavorites() {
  //   // return this.store.dispatch(setImagesWithVoteAndFavourites());
  // }

  // getVotedImages(): Observable<voteImages[]> {
  //   // return this.store.select(catsSelectors.selectVotedImages);
  // }

  // selectOnlyPositivieImage(): Observable<voteImages[]> {
  //   // return this.store.select(catsSelectors.selectOnlyPositivieImage);
  // }

  // selectOnlyNegativeImage(): Observable<voteImages[]> {
  //   // return this.store.select(catsSelectors.selectOnlyNegativeImage);
  // }

  // dislikeImage(fav_id: number) {
  //   // this.store.dispatch(deleteImageFromFavourits({ fav_id }));
  // }

  // likeImage(image_id: string) {
  //   this.store.dispatch(likeImage({ imageId: image_id }));
  // }

  // deleteVote(vote_id: number) {
  //   this.store.dispatch(removeVote({ voteId: vote_id }));
  // }
}
