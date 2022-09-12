import { createAction, props } from '@ngrx/store';
import { Api } from '../utils/api.interfaces';
import { Notification } from '../utils/notification.model';

export const loadFromApi = createAction('[Cats API] Load from database');

export const setImagesWithVote = createAction(
  '[Cats API] Set Images With Vote',
  props<{ voteImages: Api.VoteImage[]; favImages: Api.FavoriteImage[] }>()
);

export const setNotification = createAction(
  '[Notification] Set Notification',
  props<{ notifi: Notification }>()
);
