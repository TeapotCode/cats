import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';

import { ApiVotesService } from './services/api-votes.service';
import { ApiHomeService } from '../../shell/data-access/api-cats.service';
import { voteImages } from '../utilities/votesImages.model';

export interface VotesState {
  image: voteImages[];
}
interface helperIfLike {
  id: string;
  result: any; //{message, id}
}

@Injectable()
export class VotesStore extends ComponentStore<VotesState> {
  constructor(private api: ApiVotesService, private apiCats: ApiHomeService) {
    super({ image: [] });
  }

  //reducers
  protected updateImages = this.updater((state, image: voteImages[]) => ({
    image,
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

  //selectors
  selectImagesPositive(): Observable<voteImages[]> {
    return this.select((state) => state.image.filter((img) => img.value === 1));
  }

  selectImagesNegative(): Observable<voteImages[]> {
    return this.select((state) =>
      state.image.filter((img) => img.value === -1)
    );
  }

  //effects
  readonly getImages = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      switchMap((_) =>
        this.api.getVotedImages().pipe(
          tap({
            next: (result) => this.updateImages(result),
            error: (e) => console.log(e),
          })
        )
      )
    );
  });

  readonly dislikeImage = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) =>
        this.apiCats.removeFavorite(id).pipe(
          tap({
            next: (result) => this.updateImagesIfDislike(id),
            error: (e) => console.log(e),
          })
        )
      )
    );
  });

  readonly likeImage = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id) =>
        this.apiCats.setFavorite(id).pipe(
          tap({
            next: (result) => this.updateImagesIfLike({ id, result }),
            error: (e) => console.log(e),
          })
        )
      )
    );
  });

  readonly deleteImageVote = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) =>
        this.apiCats.removeVote(id).pipe(
          tap({
            next: (result) => this.updateImagesIfDelete(id),
            error: (e) => console.log(e),
          })
        )
      )
    );
  });
}
