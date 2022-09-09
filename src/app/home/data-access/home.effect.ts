import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectAll } from '../../shell/data-access/cats.selector';
import { ApiHomeService } from './api-home.service';
import * as homeAction from './home.action';
import { selectMimeType } from './home.selector';
import {
  selectBreedSelected,
  selectCategoriesSelected,
  selectImages,
} from './home.selector';

@Injectable()
export class HomeEffects {
  setPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        homeAction.loadPhotos,
        homeAction.switchCategory,
        homeAction.switchBreed,
        homeAction.setMimeType
      ),
      concatLatestFrom(() => [
        this.store.select(selectAll),
        this.store.select(selectCategoriesSelected),
        this.store.select(selectBreedSelected),
        this.store.select(selectMimeType),
      ]),
      switchMap(([action, state, category, breed, mimeType]) =>
        this.api.getImages(10, category, breed, mimeType).pipe(
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

  switchFav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.switchFavorite),
      concatLatestFrom(() => this.store.select(selectImages)),
      switchMap(([{ imageId }, images]) => {
        const image = images.find((value) => value.imageId === imageId);
        if (image?.isFavorite) {
          return this.api
            .removeFavorite(image.favoriteId)
            .pipe(
              map((_) => homeAction.setFavorite({ imageId, favoriteId: 0 }))
            );
        }

        return this.api.setFavorite(imageId).pipe(
          map((response: any) =>
            homeAction.setFavorite({
              favoriteId: +response.id,
              imageId: imageId,
            })
          )
        );
      })
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.loadCategories),
      switchMap(() => this.api.getCategories()),
      map((categories) => homeAction.setCategories({ categories }))
    )
  );

  loadBreeds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.loadBreeds),
      switchMap(() => this.api.getBreeds()),
      map((breeds) => homeAction.setBreeds({ breeds }))
    )
  );

  clearImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        homeAction.switchCategory,
        homeAction.switchBreed,
        homeAction.setMimeType
      ),
      map(() => homeAction.resetRandomImages())
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ApiHomeService
  ) {}
}
