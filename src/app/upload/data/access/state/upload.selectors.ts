import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UploadState} from "./upload.reducer";

const selectImages = createFeatureSelector<UploadState>('uploads');

export const getAllImages = createSelector(
  selectImages,
  (state: UploadState) => state.images
)

export const getIsUploading = createSelector(
  selectImages,
  (state: UploadState) => state.isUploading
)

export const getNumberOfImages = createSelector(
  selectImages,
  (state: UploadState) => state.images.length
)
