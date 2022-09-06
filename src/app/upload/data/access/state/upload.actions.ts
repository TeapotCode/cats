import {createAction, props} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface"


export const uploadImage = createAction(
  '[Upload] Upload Image',
  props<{image: Image}>()
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

