import { createAction, props } from '@ngrx/store';
import { Image } from '../utils/image.interface';
import {
  VoteFavImage,
  FavoriteVoteImage,
  Api,
} from '../../shell/utils/api.interfaces';

export const loadPhotos = createAction('[Main PAGE] Load random images');

export const setPhotos = createAction(
  '[Main PAGE] Set random images',
  props<{
    newImages: Api.RandomImage[];
    voteImages: VoteFavImage[];
    favImages: FavoriteVoteImage[];
  }>()
);
