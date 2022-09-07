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
interface helperIfLike {
  id: string;
  result: any; //{message, id}
}

@Injectable()
export class VotesStore extends ComponentStore<VotesState> {
  constructor(private api: ApiVotesService, private apiCats: ApiHomeService) {
    super({ image: [], loader: false });
  }

  //reducers
  protected updateImages = this.updater((state, image: voteImages[]) => ({
    ...state,
    image,
  }));

  protected updateLoader = this.updater((state) => ({
    ...state,
    loader: !state.loader,
  }));

  protected updateImagesIfDislike = this.updater((state, id: number) => {
    const newImage: voteImages[] = state.image.map((img) =>
      img.favoriteId === id ? { ...img, isFavorite: false } : img
    );

    return {
      ...state,
      image: newImage,
    };
  });

  protected updateImagesIfLike = this.updater((state, id: helperIfLike) => {
    const newImage: voteImages[] = state.image.map((img) =>
      img.image_id === id.id
        ? { ...img, isFavorite: true, favoriteId: id.result.id }
        : img
    );

    return {
      ...state,
      image: newImage,
    };
  });

  protected updateImagesIfDelete = this.updater((state, id: number) => {
    const newImage = state.image.filter((img) => img.id !== id);
    return {
      ...state,
      image: newImage,
    };
  });

  protected updateImagesIfClickFavourite = this.updater(
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
            error: (e) => console.log(e),
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
            next: (result) => {
              this.updateImagesIfDislike(id);
              console.log(result);
            },
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
            next: (result) => {
              this.updateImagesIfLike({ id, result });
              console.log(result);
            },
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
            next: (result) => {
              this.updateImagesIfDelete(id);
              console.log(result);
            },
            error: (e) => console.log(e),
          })
        )
      )
    );
  });
}
