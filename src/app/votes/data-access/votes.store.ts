import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';

import { ApiVotesService } from './services/api-votes.service';

import { Images } from '../utilities/images.model';

export interface VotesState {
  images: Images[];
}

@Injectable()
export class VotesStore extends ComponentStore<VotesState> {
  constructor(private api: ApiVotesService) {
    super({ images: [] });
  }

  //reducers
  protected updateImages = this.updater((state, images: Images[]) => ({
    images,
  }));

  //selectors
  selectImages(): Observable<Images[]> {
    return this.select((state) => state.images);
  }

  selectOnlyPositivieImage(): Observable<Images[]> {
    return this.select((state) =>
      state.images.filter((img) => img.value === 1)
    );
  }

  selectOnlyNegativeImage(): Observable<Images[]> {
    return this.select((state) =>
      state.images.filter((img) => img.value === 0)
    );
  }

  //effects
  readonly getImages = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      switchMap((_) =>
        this.api.getImagesVote().pipe(
          tap({
            next: (result) => this.updateImages(result),
            error: (e) => console.log(e),
          })
        )
      )
    );
  });
}
