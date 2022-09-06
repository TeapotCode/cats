import {createReducer, on} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface";
import * as uploadActions from './upload.actions';

export interface UploadState {
  images: Image[];
}

export const uploadInitialState: UploadState = {
  images: [],
}

export const uploadReducer = createReducer(
  uploadInitialState,
  on(uploadActions.fillStateWithImages, (state: UploadState, { images }) => ({
    ...state,
    images: [...images]
  })),
  on(uploadActions.uploadImage, (state: UploadState, { image }) => ({
    ...state,
    images: [...state.images, image]
  })),
  on(uploadActions.addImagesToState, (state: UploadState, { images }) => ({
    ...state,
    images: [...state.images, ...images]
  })),
  on(uploadActions.deleteImage, (state: UploadState, { image }) => ({
    ...state,
    images: [...state.images.filter(img => img.id !== image.id)]
  })),
)
