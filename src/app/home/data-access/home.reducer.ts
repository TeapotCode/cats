import { createReducer, on } from '@ngrx/store';
import { RandomImage } from '../utils/randomImage.interface';
import * as homeActions from './home.action';

export interface HomeState {
  images: RandomImage[];
}

const initialState: HomeState = {
  images: [],
};

export const homeReducerKey = 'home';

export const homeReducer = createReducer(
  initialState,

  on(homeActions.setPhotos, (state, { newImages, voteImages, favImages }) => {
    const images: RandomImage[] = newImages.map((newImage) => {
      const voteImage = voteImages.find(
        (value) => value.image_id === newImage.id
      );

      const favImage = favImages.find(
        (value) => value.image_id === newImage.id
      );

      return {
        imageId: newImage.id,
        imageUrl: newImage.url,
        vote: voteImage?.value ?? 0,
        voteId: voteImage?.id ?? 0,
        favoriteId: favImage?.id ?? 0,
        isFavorite: !!favImage ?? false,
      };
    });

    return {
      ...state,
      images,
    };
  })
);
