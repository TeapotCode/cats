import {Image} from "../../../utilities/ImagesInterface";
import * as uploadActions from './upload.actions';
import {uploadReducer, UploadState} from "./upload.reducer";

const imagesList: Image[] = [
  {
    id: "1"
  },
  {
    id: "2"
  },
  {
    id: "3"
  }
];

const testImage: Image = {
  id: "1"
}

let state = {
  uploads: {
    images: [...imagesList],
    isUploading: false
  }
};
let uploads: UploadState;

beforeEach(() => {
  state = {
    uploads: {
      images: [...imagesList],
      isUploading: false
    }
  }
  uploads = state.uploads;
})

describe('UploadReducer', () => {
  it('should fill state with array of images', () => {
    const action = uploadActions.fillStateWithImages({images: Array(5).fill({})})
    const newState = uploadReducer(uploads, action);
    const expectedState = {
        ...uploads,
        images: Array(5).fill({}),
    }
    expect(newState).toEqual(expectedState);
  })
  it('should delete image with specific identifier', () => {
    const action = uploadActions.deleteImage({image: testImage })
    const newState = uploadReducer(uploads, action);
    const expectedState = {
      ...uploads,
      images: [...imagesList.filter(img => img.id !== testImage.id)]
    }
    expect(newState).toEqual(expectedState);
  })
  it('should change loading property on startloading', () => {
    let action = uploadActions.startLoading();
    let newState = uploadReducer(uploads, action);
    let expectedState = {
      ...uploads,
      isUploading: true
    }
    expect(newState).toEqual(expectedState);
  })
  it('should change loading property on stoploading', () => {
    let action = uploadActions.stopLoading();
    let newState = uploadReducer(uploads, action);
    let expectedState = {
      ...uploads,
      isUploading: false
    }
    expect(newState).toEqual(expectedState);
  })
})
