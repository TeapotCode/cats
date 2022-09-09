import { Image} from '../../../utilities/ImagesInterface';
import {UploadState} from "./upload.reducer";
import {getAllImages, getIsUploading, getNumberOfImages} from "./upload.selectors";

let state: UploadState = {
    images: [],
    isUploading: false
};

const imagesArr: Array<Image> = Array(5).fill({});

beforeEach(() => {
  state = {
      images: imagesArr,
      isUploading: false
  }
})

describe('uploadSelector', () => {
  it("should return all images", () => {
    expect(getAllImages.projector(state)).toEqual(imagesArr)
  })
  it("should return isUploading status", () => {
    expect(getIsUploading.projector(state)).toBe(false);
  })
  it("should get number of images", () => {
    expect(getNumberOfImages.projector(state)).toEqual(state.images.length);
  })
})
