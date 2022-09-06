import { createAction, props } from '@ngrx/store';
import { Api } from '../utils/api.interfaces';

export const likeImage = createAction(
  '[Cats PAGE] Like Image',
  props<{ imageId: string }>()
);

export const setVoteId = createAction(
  '[Cats PAGE] Set VoteID',
  props<{ voteId: number; imageId: string }>()
);

export const dislikeImage = createAction(
  '[Cats PAGE] Dislike Image',
  props<{ imageId: string }>()
);

export const removeVote = createAction(
  '[Cats PAGE] Remove Vote From Image',
  props<{ voteId: number }>()
);

export const switchFavoriteImage = createAction(
  '[Cats PAGE] Switch Favorite Image',
  props<{ imageId: string }>()
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
