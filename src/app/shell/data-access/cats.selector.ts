import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatsState, catsReducerKey } from './cats.reducer';

export const selectFeature = createFeatureSelector<CatsState>(catsReducerKey);

export const selectFavouritesImages = createSelector(
  selectFeature,
  (state: CatsState) => state.favoriteImages
);

export const selectVotedImages = createSelector(
  selectFeature,
  (state: CatsState) => state.voteImages
);

export const selectOnlyPositivieImage = createSelector(
  selectFeature,
  (state: CatsState) => state.voteImages.filter((result) => result.value === 1)
);

export const selectOnlyNegativeImage = createSelector(
  selectFeature,
  (state: CatsState) => state.voteImages.filter((result) => result.value === -1)
);
