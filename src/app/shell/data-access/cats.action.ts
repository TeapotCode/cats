import { createAction, props } from '@ngrx/store';
import { Api } from '../utils/api.interfaces';

export const likeImageMain = createAction('[Cats PAGE] Like Image');

export const dislikeImageMain = createAction('[Cats PAGE] Dislike Image');

export const removeVoteMain = createAction('[Cats PAGE] Add Favorite Image');

export const switchFavoriteImageMain = createAction(
  '[Cats PAGE] Switch Favorite Image'
);

export const loadRandomImages = createAction('[Cats API] Load Random Images');

export const loadImagesWithVote = createAction(
  '[Cats API] Load Images With Vote'
);

export const loadFavouritesImages = createAction(
  '[Cats API] Load Favourites Images'
);

export const setRandomImages = createAction(
  '[Cats API] Set Random Images',
  props<{ images: Api.RandomImage[] }>()
);

export const setImagesWithVote = createAction(
  '[Cats API] Set Images With Vote',
  props<{ images: Api.VoteImage[] }>()
);

export const setFavouritesImages = createAction(
  '[Cats API] Set Favourites Images',
  props<{ images: Api.FavoriteImage[] }>()
);
