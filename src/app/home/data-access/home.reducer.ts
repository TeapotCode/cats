import { createReducer, on } from '@ngrx/store';
import { Category } from '../utils/category.interface';
import { RandomImage } from '../utils/randomImage.interface';
import * as homeActions from './home.action';

export interface HomeState {
  images: RandomImage[];
  categorySelected: number | null;
  categories: Category[];

  breedSelected: number | null;
  breeds: Category[];
}

const initialState: HomeState = {
  images: [],
  categorySelected: null,
  categories: [],
  breedSelected: null,
  breeds: [],
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
      images: [...state.images, ...images],
    };
  }),

  on(homeActions.setImageVoteId, (state, { value, voteId, imageId }) => {
    const images = state.images.map((image) =>
      image.imageId === imageId ? { ...image, vote: value, voteId } : image
    );

    return {
      ...state,
      images,
    };
  }),

  on(homeActions.setFavorite, (state, { imageId, favoriteId }) => {
    const images: RandomImage[] = state.images.map((value) =>
      value.imageId === imageId
        ? { ...value, favoriteId, isFavorite: !!favoriteId }
        : value
    );

    return {
      ...state,
      images,
    };
  }),

  on(homeActions.setCategories, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(homeActions.setBreeds, (state, { breeds }) => ({
    ...state,
    breeds,
  })),

  on(homeActions.resetRandomImages, (state) => ({ ...state, images: [] })),

  on(homeActions.switchCategory, (state, { categoryId }) => {
    return {
      ...state,
      categorySelected: categoryId,
    };
  }),
  on(homeActions.switchBreed, (state, { breedId }) => {
    return {
      ...state,
      breedSelected: breedId,
    };
  })
);
