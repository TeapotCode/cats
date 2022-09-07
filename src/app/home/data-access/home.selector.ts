import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState, homeReducerKey } from './home.reducer';

export const featureSelector = createFeatureSelector<HomeState>(homeReducerKey);

export const selectImages = createSelector(
  featureSelector,
  (state: HomeState) => state.images
);
