import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectAll } from '../../shell/data-access/cats.selector';
import * as homeAction from './home.action';
import { ApiHomeService } from './api-home.service';

@Injectable()
export class HomeEffects {
  setPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.loadPhotos),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([action, state]) =>
        this.api.getImages(10).pipe(
          map((response) =>
            homeAction.setPhotos({
              newImages: response,
              voteImages: state.voteImages,
              favImages: state.favoriteImages,
            })
          )
        )
      )
    )
  );

  likeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.likeImage),
      switchMap(({ imageId }) =>
        this.api.sendVote(1, imageId).pipe(
          map((response) =>
            homeAction.setImageVoteId({
              value: 1,
              voteId: response.id,
              imageId,
            })
          )
        )
      )
    )
  );

  dislikeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.dislikeImage),
      switchMap(({ imageId }) =>
        this.api.sendVote(-1, imageId).pipe(
          map((response) =>
            homeAction.setImageVoteId({
              value: -1,
              voteId: response.id,
              imageId,
            })
          )
        )
      )
    )
  );

  removeVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.removeVote),
      switchMap(({ voteId, imageId }) =>
        this.api.removeVote(voteId).pipe(
          map(() =>
            homeAction.setImageVoteId({
              value: 0,
              voteId: 0,
              imageId,
            })
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ApiHomeService
  ) {}
}
