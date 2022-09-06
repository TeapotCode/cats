import {createReducer, on} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface";
import * as uploadActions from './upload.actions';

export interface UploadState {
  images: Image[];
}

export const uploadInitialState: UploadState = {
  images: []
}

export const uploadReducer = createReducer(
  uploadInitialState,
  on(uploadActions.addUploads, (state: UploadState, { images }) => ({
    ...state,
    products: [...state.images, ...images]
  })),
  on(uploadActions.deleteUploadedImage, (state: UploadState, { image }) => ({
    ...state,
    products: [...state.images.filter(img => img !== image)]
  })),
)
