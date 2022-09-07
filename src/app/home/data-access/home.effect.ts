import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { selectAll } from '../../shell/data-access/cats.selector';
import * as homeAction from './home.action';
import { ApiHomeService } from './api-home.service';
import {
  selectImages,
  selectCategoriesSelected,
  selectBreedSelected,
} from './home.selector';
import { switchCategory } from './home.action';

@Injectable()
export class HomeEffects {
  setPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        homeAction.loadPhotos,
        homeAction.switchCategory,
        homeAction.switchBreed
      ),
      concatLatestFrom(() => [
        this.store.select(selectAll),
        this.store.select(selectCategoriesSelected),
        this.store.select(selectBreedSelected),
      ]),
      switchMap(([_action, state, category, breed]) =>
        this.api.getImages(10, category, breed).pipe(
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

  switchVote$ = createEffect(() =>
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

  switchCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeAction.switchCategory, homeAction.switchBreed),
      map(() => homeAction.resetRandomImages())
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ApiHomeService
  ) {}
}
