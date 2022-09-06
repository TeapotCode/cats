import { createReducer, on } from '@ngrx/store';
import * as catsActions from './cats.action';
import { Api } from '../utils/api.interfaces';

export interface CatsState {
  randomImages: Api.RandomImage[];
  voteImages: Api.VoteImage[];
  favoriteImages: Api.FavoriteImage[];
}

const initialState: CatsState = {
  randomImages: [],
  voteImages: [],
  favoriteImages: [],
};

export const catsReducerKey = 'cats';

export const catsReducer = createReducer(
  initialState,
  on(catsActions.setFavouritesImages, (state, { images }) => ({
    ...state,
    favoriteImages: images,
  })),
  on(catsActions.setImagesWithVote, (state, { images }) => ({
    ...state,
    voteImages: images,
  })),
  on(catsActions.setRandomImages, (state, { images }) => ({
    ...state,
    randomImages: [...state.randomImages, ...images],
  }))
);
