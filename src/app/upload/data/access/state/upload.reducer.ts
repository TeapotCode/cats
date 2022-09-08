import {createReducer, on} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface";
import * as uploadActions from './upload.actions';

export interface UploadState {
  images: Image[];
  isUploading: boolean;
}

export const uploadInitialState: UploadState = {
  images: [],
  isUploading: false
}

export const uploadReducer = createReducer(
  uploadInitialState,
  on(uploadActions.fillStateWithImages, (state: UploadState, { images }) => ({
    ...state,
    images: [...images],
    isUploading: false
  })),
  on(uploadActions.addImagesToState, (state: UploadState, { images }) => ({
    ...state,
    images: [...state.images, ...images]
  })),
  on(uploadActions.deleteImage, (state: UploadState, { image }) => ({
    ...state,
    images: [...state.images.filter(img => img.id !== image.id)]
  })),
  on(uploadActions.startLoading, (state: UploadState) => ({
    ...state,
    isUploading: true
  })),
)
