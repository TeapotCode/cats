import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatsState, catsReducerKey } from './cats.reducer';

export const selectFeature = createFeatureSelector<CatsState>(catsReducerKey);

export const selectFavouritesImages = createSelector(
  selectFeature,
  (state: CatsState) => state.favoriteImages
);

export const selectRandomImages = createSelector(
  selectFeature,
  (state: CatsState) => state.randomImages
);

export const selectVotedImages = createSelector(
  selectFeature,
  (state: CatsState) => state.voteImages
);
