import {createAction, props} from "@ngrx/store";
import {Image} from "../../../utilities/ImagesInterface"

export const addUploads = createAction(
  '[Upload] Add Uploaded Images',
  props<{images: Image[]}>()
)

export const deleteUploadedImage = createAction(
  '[Upload] Delete Uploaded Image',
  props<{image: Image}>()
)
