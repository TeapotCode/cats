import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as catsAction from './cats.action';
import { switchMap, map, tap } from 'rxjs';
import { ApiHomeService } from './api-cats.service';
import { Store } from '@ngrx/store';
import { selectFavouritesImages, selectRandomImages } from './cats.selector';
import { CardComponent } from '../../home/ui/card/card.component';

@Injectable()
export class CatsEffects {
  loadRandomImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.loadRandomImages),
      switchMap(() => this.api.getImages(10)),
      map((response) => catsAction.setRandomImages({ images: response }))
    )
  );

  loadFavouritesImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.loadFavouritesImages),
      switchMap(() => this.api.getFavourites()),
      map((response) => catsAction.setFavouritesImages({ images: response }))
    )
  );

  loadVoteImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.loadImagesWithVote),
      switchMap(() => this.api.getVotes()),
      map((response) => catsAction.setImagesWithVote({ images: response }))
    )
  );

  likeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.likeImage),
      switchMap(({ imageId }) =>
        this.api
          .sendVote(1, imageId)
          .pipe(map((response) => ({ ...response, imageId })))
      ),
      map((response: any) =>
        catsAction.setVoteId({
          voteId: response.id,
          imageId: response.imageId,
        })
      )
    )
  );

  dislikeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.dislikeImage),
      switchMap(({ imageId }) =>
        this.api
          .sendVote(-1, imageId)
          .pipe(map((response) => ({ ...response, imageId })))
      ),
      map((response: any) =>
        catsAction.setVoteId({
          voteId: response.id,
          imageId: response.imageId,
        })
      )
    )
  );

  removeVote$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsAction.removeVote),
        switchMap(({ voteId }) => this.api.removeVote(voteId))
      ),
    { dispatch: false }
  );

  switchVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsAction.switchFavoriteImage),
      concatLatestFrom(() => this.store.select(selectRandomImages)),
      switchMap(([{ imageId }, images]) => {
        const image = images.find((value) => value.imageId === imageId);
        if (image?.isFavorite) {
          return this.api
            .removeFavorite(image.favoriteId)
            .pipe(
              map((_) => catsAction.removeFromFavorite({ imageId: imageId }))
            );
        }

        return this.api.setFavorite(imageId).pipe(
          map((response: any) =>
            catsAction.setFavoriteId({
              favoriteId: +response.id,
              imageId: imageId,
            })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private api: ApiHomeService,
    private store: Store
  ) {}
}
