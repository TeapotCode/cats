import { createAction, props } from '@ngrx/store';
import {
  Api,
  FavoriteVoteImage,
  VoteFavImage,
} from '../../shell/utils/api.interfaces';
import { Category } from '../utils/category.interface';
import { MimeType } from '../utils/mime-type.interface';

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

export const resetRandomImages = createAction(
  '[Home STORE] Reset Random Images'
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

export const revertLike = createAction(
  '[Home STORE] Revert dis/like',
  props<{ imageId: string }>()
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

//Categories
export const switchCategory = createAction(
  '[Home PAGE] Switch category',
  props<{ categoryId: number | null }>()
);

export const loadCategories = createAction('[Home PAGE] Load Categories');

export const setCategories = createAction(
  '[Home STORE] Set Categories',
  props<{ categories: Category[] }>()
);

//Categories
export const switchBreed = createAction(
  '[Home PAGE] Switch breed',
  props<{ breedId: number | null }>()
);

export const loadBreeds = createAction('[Home PAGE] Load Breeds');

export const setBreeds = createAction(
  '[Home STORE] Set Breeds',
  props<{ breeds: Category[] }>()
);

//mime type
export const setMimeType = createAction(
  '[Home PAGE] Set Mime Type',
  props<{ mimeType: MimeType }>()
);
