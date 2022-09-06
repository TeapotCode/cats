import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UploadState} from "./upload.reducer";

const selectImages = createFeatureSelector<UploadState>('images');

export const getAllImages = createSelector(
  selectImages,
  (state: UploadState) => state.images
)
