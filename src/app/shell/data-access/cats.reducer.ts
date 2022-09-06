import { createReducer, on } from '@ngrx/store';
import { FavoriteVoteImage, VoteFavImage } from '../utils/api.interfaces';
import * as catsAction from './cats.action';

export interface CatsState {
  voteImages: VoteFavImage[];
  favoriteImages: FavoriteVoteImage[];
}

const initialState: CatsState = {
  voteImages: [],
  favoriteImages: [],
};

export const catsReducerKey = 'cats';

export const catsReducer = createReducer(
  initialState,
  on(catsAction.setImagesWithVote, (state, { voteImages, favImages }) => {
    const newVoteImages: VoteFavImage[] = voteImages.map((value) => {
      const fav = favImages.find((fav) => fav.image_id === value.image_id);

      return {
        ...value,
        favoriteId: fav?.id,
        isFavorite: !!fav,
      };
    });

    const newFavImages: FavoriteVoteImage[] = favImages.map((value) => {
      const voteImg = voteImages.find(
        (vote) => vote.image_id === value.image_id
      );

      return {
        ...value,
        voteId: voteImg?.id,
        vote: voteImg?.value,
      };
    });

    return {
      ...state,
      favoriteImages: newFavImages,
      voteImages: newVoteImages,
    };
  })
);
