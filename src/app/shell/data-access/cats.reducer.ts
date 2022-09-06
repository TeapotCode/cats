import { createReducer, on } from '@ngrx/store';
import * as catsActions from './cats.action';
import { Api } from '../utils/api.interfaces';
import { RandomImage } from '../utils/randomImage.interface';
import { Vote } from '../../home/utils/vote.interface';

export interface CatsState {
  randomImages: RandomImage[];
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
  on(catsActions.setImagesWithVote, (state, { images }) => {
    const filteredImages = images.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.image_id === value.image_id)
    );
    return {
      ...state,
      voteImages: filteredImages,
    };
  }),
  on(catsActions.setRandomImages, (state, { images }) => {
    const new_images = images.map((value) => {
      const fav = state.favoriteImages.find((fav) => fav.image_id === value.id);
      const voted = state.voteImages.find((vote) => vote.image_id === value.id);

      return {
        imageId: value.id,
        imageUrl: value.url,
        isFavorite: !!fav,
        favoriteId: fav ? fav.id : 0,
        vote: voted ? voted.value : 0,
        voteId: voted ? voted.id : 0,
      };
    });

    return {
      ...state,
      randomImages: new_images,
    };
  }),
  on(catsActions.likeImage, (state, { imageId }) => {
    const newRandomImages = state.randomImages.map((value) =>
      value.imageId === imageId ? { ...value, vote: 1 } : value
    );

    const newVotedImages = state.voteImages.map((vote) =>
      vote.image_id === imageId ? { ...vote, value: 1 } : vote
    );

    return {
      ...state,
      voteImages: newVotedImages,
      randomImages: newRandomImages,
    };
  }),
  on(catsActions.dislikeImage, (state, { imageId }) => {
    const newRandomImages = state.randomImages.map((value) =>
      value.imageId === imageId ? { ...value, vote: -1 } : value
    );

    const newVotedImages = state.voteImages.map((vote) =>
      vote.image_id === imageId ? { ...vote, value: -1 } : vote
    );

    return {
      ...state,
      voteImages: newVotedImages,
      randomImages: newRandomImages,
    };
  }),
  on(catsActions.setVoteId, (state, { voteId, imageId }) => {
    const newRandomImages = state.randomImages.map((value) =>
      value.imageId === imageId ? { ...value, voteId } : value
    );

    return {
      ...state,
      randomImages: newRandomImages,
    };
  }),
  on(catsActions.removeVote, (state, { voteId }) => {
    const newImages = state.randomImages.map((value) =>
      value.voteId === voteId ? { ...value, vote: 0, voteId: 0 } : value
    );
    return {
      ...state,
      randomImages: newImages,
    };
  }),
  on(catsActions.setFavoriteId, (state, { favoriteId, imageId }) => {
    const newItems = state.randomImages.map((value) =>
      value.imageId === imageId
        ? { ...value, favoriteId, isFavorite: true }
        : value
    );

    return {
      ...state,
      randomImages: newItems,
    };
  }),

  on(catsActions.removeFromFavorite, (state, { imageId }) => {
    const newItems = state.randomImages.map((value) =>
      value.imageId === imageId
        ? { ...value, isFavorite: false, favoriteId: 0 }
        : value
    );

    return {
      ...state,
      randomImages: newItems,
    };
  })
);
