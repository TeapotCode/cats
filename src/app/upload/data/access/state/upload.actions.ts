import {createAction, props} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface"


export const uploadImage = createAction(
  '[Upload] Upload Image',
  props<{image: Image}>()
)

export const deleteImage = createAction(
  '[Upload] Delete Uploaded Image',
  props<{image: Image}>()
)

