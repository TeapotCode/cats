import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { mergeMap, Observable, switchMap, tap } from 'rxjs';

import { ApiVotesService } from './services/api-votes.service';
import { ApiHomeService } from '../../shell/data-access/api-cats.service';
import { voteImages } from '../utilities/votesImages.model';

export interface VotesState {
  image: voteImages[];
  loader: boolean;
}
export interface helperIfLike {
  id: string;
  result: any; //{message, id}
}

@Injectable()
export class VotesStore extends ComponentStore<VotesState> {
  constructor(private api: ApiVotesService, private apiCats: ApiHomeService) {
    super({ image: [], loader: false });
  }

  //reducers
  readonly updateImages = this.updater((state, image: voteImages[]) => ({
    ...state,
    image,
  }));

  readonly updateLoader = this.updater((state) => ({
    ...state,
    loader: !state.loader,
  }));

  readonly updateImagesIfDislike = this.updater((state, id: number) => {
    const newImage: voteImages[] = state.image.map((img) => {
      if (img.favoriteId === id) {
        this.api.setNotifications({
          name: 'Usunięto z ulubionych',
          date: Date.now(),
          id: img.id,
          type: 'votes',
          action: 'unlike',
        });
        return { ...img, isFavorite: false };
      } else {
        return img;
      }
    });

    return {
      ...state,
      image: newImage,
    };
  });

  readonly updateImagesIfLike = this.updater((state, id: helperIfLike) => {
    const newImage: voteImages[] = state.image.map((img) => {
      if (img.image_id === id.id) {
        this.api.setNotifications({
          name: 'Dodano do ulubionych',
          date: Date.now(),
          id: img.id,
          type: 'votes',
          action: 'like',
        });
        return { ...img, isFavorite: true, favoriteId: id.result.id };
      } else {
        return img;
      }
    });

    return {
      ...state,
      image: newImage,
    };
  });

  readonly updateImagesIfDelete = this.updater((state, id: number) => {
    const newImage = state.image.filter((img) => img.id !== id);
    return {
      ...state,
      image: newImage,
    };
  });

  readonly updateImagesIfClickFavourite = this.updater(
    (state, id: string | number) => {
      const newImage: voteImages[] = state.image.map((img) =>
        img.image_id === id || img.favoriteId === id
          ? { ...img, isFavorite: !img.isFavorite }
          : img
      );
      return {
        ...state,
        image: newImage,
      };
    }
  );

  //selectors
  selectImages(): Observable<voteImages[]> {
    return this.select((state) => state.image);
  }

  selectImagesPositive(): Observable<voteImages[]> {
    return this.select((state) => state.image.filter((img) => img.value === 1));
  }

  selectImagesNegative(): Observable<voteImages[]> {
    return this.select((state) =>
      state.image.filter((img) => img.value === -1)
    );
  }

  selectLoader(): Observable<boolean> {
    return this.select((state) => state.loader);
  }

  //effects
  readonly getImages = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      tap(() => this.updateLoader()),
      switchMap((_) =>
        this.api.getVotedImages().pipe(
          tap({
            next: (result) => {
              this.updateImages(result);
              this.updateLoader();
            },
            error: (e) => console.error(e),
          })
        )
      )
    );
  });

  readonly dislikeImage = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      tap(() => this.updateImagesIfClickFavourite(id$)),
      mergeMap((id) =>
        this.apiCats.removeFavorite(id).pipe(
          tap({
            next: (result) => this.updateImagesIfDislike(id),
            error: (e) => {
              this.updateImagesIfClickFavourite(id);
              console.error(e);
            },
          })
        )
      )
    );
  });

  readonly likeImage = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      tap(() => this.updateImagesIfClickFavourite(id$)),
      mergeMap((id) =>
        this.apiCats.setFavorite(id).pipe(
          tap({
            next: (result) => this.updateImagesIfLike({ id, result }),
            error: (e) => {
              this.updateImagesIfClickFavourite(id);
              console.error(e);
            },
          })
        )
      )
    );
  });

  readonly deleteImageVote = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      mergeMap((id) =>
        this.apiCats.removeVote(id).pipe(
          tap({
            next: (result) => this.updateImagesIfDelete(id),
            error: (e) => console.error(e),
          })
        )
      )
    );
  });
}
