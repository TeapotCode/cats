import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState, homeReducerKey } from './home.reducer';

export const featureSelector = createFeatureSelector<HomeState>(homeReducerKey);

export const selectImages = createSelector(
  featureSelector,
  (state: HomeState) => state.images
);

export const selectCategories = createSelector(
  featureSelector,
  (state: HomeState) => state.categories
);

export const selectCategoriesSelected = createSelector(
  featureSelector,
  (state: HomeState) => state.categorySelected
);

export const selectBreeds = createSelector(
  featureSelector,
  (state: HomeState) => state.breeds
);

export const selectBreedSelected = createSelector(
  featureSelector,
  (state: HomeState) => state.breedSelected
);
