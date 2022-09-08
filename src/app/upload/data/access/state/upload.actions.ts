import {createAction, props} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface"


export const uploadImage = createAction(
  '[Upload] Upload Image',
  props<{file: File}>()
)

export const addImagesToState = createAction(
  '[Upload] Add Images To State',
  props<{images: Image[]}>()
)

export const deleteImage = createAction(
  '[Upload] Delete Uploaded Image',
  props<{image: Image}>()
)

export const fillStateWithImages = createAction(
  '[Upload] Fill State With Images',
  props<{images: Image[]}>()
)

export const syncState = createAction(
  '[Upload] Sync State'
)

export const displayServerError = createAction(
  '[Upload] Display Server Error',
  props<{error: Error}>()
)

export const startLoading = createAction(
  '[Upload] Start Loading'
)
