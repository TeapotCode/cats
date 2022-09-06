import { createAction, props } from '@ngrx/store';
import { Api } from '../utils/api.interfaces';

export const loadFromApi = createAction('[Cats API] Load from database');

export const setImagesWithVote = createAction(
  '[Cats API] Set Images With Vote',
  props<{ voteImages: Api.VoteImage[]; favImages: Api.FavoriteImage[] }>()
);
