import { createReducer, on } from '@ngrx/store';
import { Category } from '../utils/category.interface';
import { HomeImage } from '../utils/randomImage.interface';
import * as homeActions from './home.action';
import { MimeType } from '../utils/mime-type.interface';

export interface HomeState {
  images: HomeImage[];
  categorySelected: number | null;
  categories: Category[];

  breedSelected: number | null;
  breeds: Category[];

  mimeType: MimeType;

  isLoading: boolean;
}

export const initialState: HomeState = {
  images: [],
  categorySelected: null,
  categories: [],
  breedSelected: null,
  breeds: [],
  mimeType: 'all',
  isLoading: true,
};

export const homeReducerKey = 'home';

export const homeReducer = createReducer(
  initialState,

  on(homeActions.setPhotos, (state, { newImages, voteImages, favImages }) => {
    const images: HomeImage[] = newImages.map((newImage) => {
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
      isLoading: false,
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
    const images: HomeImage[] = state.images.map((value) =>
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

  on(homeActions.resetRandomImages, (state) => ({
    ...state,
    images: [],
    isLoading: true,
  })),

  on(homeActions.switchCategory, (state, { categoryId }) => ({
    ...state,
    categorySelected: categoryId,
    breedSelected: null,
  })),
  on(homeActions.switchBreed, (state, { breedId }) => ({
    ...state,
    breedSelected: breedId,
    categorySelected: null,
    mimeType: 'all',
  })),

  on(homeActions.setMimeType, (state, { mimeType }) => ({
    ...state,
    mimeType,
    breedSelected: null,
  })),

  on(homeActions.loadPhotos, (state) => ({ ...state, isLoading: true }))
);
