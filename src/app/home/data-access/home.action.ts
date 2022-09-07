import { createAction, props } from '@ngrx/store';
import { Image } from '../utils/image.interface';
import {
  VoteFavImage,
  FavoriteVoteImage,
  Api,
} from '../../shell/utils/api.interfaces';

export const loadPhotos = createAction(
  '[Home PAGE] Load random images request'
);

export const setPhotos = createAction(
  '[Home PAGE] Set random images',
  props<{
    newImages: Api.RandomImage[];
    voteImages: VoteFavImage[];
    favImages: FavoriteVoteImage[];
  }>()
);

//Like related actions
export const likeImage = createAction(
  '[Home PAGE] Like Image',
  props<{ imageId: string }>()
);
export const dislikeImage = createAction(
  '[Home PAGE] Dislike Image',
  props<{ imageId: string }>()
);
export const removeVote = createAction(
  '[Home PAGE] Remove Vote',
  props<{ voteId: number; imageId: string }>()
);

export const setImageVoteId = createAction(
  '[Home STORE] Set Image Vote',
  props<{ value: number; voteId: number; imageId: string }>()
);

//Favorite related actions
export const switchFavorite = createAction(
  '[Home PAGE] Toggle favourite button',
  props<{ imageId: string }>()
);

export const setFavorite = createAction(
  '[Home STORE] Set favourite button',
  props<{ imageId: string; favoriteId: number }>()
);
