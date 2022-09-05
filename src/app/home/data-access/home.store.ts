import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Image } from '../utils/image.interface';
import { Vote } from '../utils/vote.interface';
import { ApiHomeService } from './api-home.service';

export interface HomeState {
  images: Image[];
  breeds: string;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  constructor(private api: ApiHomeService) {
    super({ images: [], breeds: '' });

    this.getImages(10);
  }

  readonly images$: Observable<Image[]> = this.select((state) => state.images);

  readonly addImages = this.updater((state, images: Image[]) => ({
    ...state,
    images: [...state.images, ...images],
  }));

  readonly getImages = this.effect((limit: Observable<number>) => {
    return limit.pipe(
      switchMap((limit) => {
        return this.api.getImages(limit);
      }),
      tap((response) => this.addImages(response))
    );
  });

  readonly vote = this.effect((vote: Observable<Vote>) => {
    return vote.pipe(
      switchMap((vote) => {
        return this.api.sendVote(vote.value, vote.image_id);
      }),
      map((response) => (response ? true : false))
    );
  });
}
