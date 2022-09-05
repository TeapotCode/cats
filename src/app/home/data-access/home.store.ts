import { Injectable } from '@angular/core';
import { Image } from '../utils/image.interface';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
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
}
