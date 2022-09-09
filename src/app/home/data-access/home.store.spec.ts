import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { getMockStore, MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockWithValues } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
import * as globalSelectors from '../../shell/data-access/cats.selector';
import { HomeImage } from '../utils/randomImage.interface';
import { ApiHomeService } from './api-home.service';
import * as actions from './home.action';
import { HomeEffects } from './home.effect';
import * as fromReducer from './home.reducer';
import { HomeState } from './home.reducer';
import * as selectors from './home.selector';

describe('HomeStore', () => {
  describe('Selectors', () => {
    const initialState: HomeState = {
      images: ['exampleImage' as unknown as HomeImage],

      categorySelected: 3,
      categories: [{ id: 3, name: 'test' }],

      breedSelected: 2,
      breeds: [{ id: 2, name: 'test' }],
      mimeType: 'all',
      isLoading: false,
    };

    it('select image', () => {
      const result = selectors.selectImages.projector(initialState);
      expect(result).toBe(initialState.images);
    });

    it('select categories', () => {
      const result = selectors.selectCategories.projector(initialState);
      expect(result).toBe(initialState.categories);
    });

    it('select selected category', () => {
      const result = selectors.selectCategoriesSelected.projector(initialState);
      expect(result).toBe(initialState.categorySelected);
    });

    it('select breeds', () => {
      const result = selectors.selectBreeds.projector(initialState);
      expect(result).toBe(initialState.breeds);
    });

    it('select selected breed', () => {
      const result = selectors.selectBreedSelected.projector(initialState);
      expect(result).toBe(initialState.breedSelected);
    });

    it('select isLoading', () => {
      const result = selectors.selectIsLoading.projector(initialState);
      expect(result).toBe(initialState.isLoading);
    });

    it('select MimeType', () => {
      const result = selectors.selectMimeType.projector(initialState);
      expect(result).toBe(initialState.mimeType);
    });
  });

  describe('Effects', () => {
    let effects: HomeEffects;
    let store: Store;
    let action$: Actions;
    let apiHome: ApiHomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          HttpClient,
          provideMockWithValues(ApiHomeService, {
            sendVote: jest.fn().mockReturnValue(of({ id: 3, message: 'test' })),
          }),
          provideMockStore({
            selectors: [
              { selector: selectors.selectCategoriesSelected, value: 3 },
              { selector: selectors.selectBreedSelected, value: 3 },
              { selector: selectors.selectMimeType, value: 'all' },
              {
                selector: globalSelectors.selectAll,
                value: { voteImages: [], favoriteImages: [] },
              },
            ],
          }),
          provideMockActions(() => action$),
          HomeEffects,
        ],
      });

      effects = TestBed.inject(HomeEffects);
      store = TestBed.inject(MockStore);
      apiHome = TestBed.inject(ApiHomeService);
    });

    it('should trigger api call on loadPhotos action and set photos', (done) => {
      action$ = of(actions.loadPhotos());

      const getImagesSpy = jest
        .spyOn(apiHome, 'getImages')
        .mockReturnValue(of([{ id: 'id', url: 'url', width: 10, height: 20 }]));

      effects.setPhotos$.subscribe((action) => {
        expect(action.type).toBe(actions.setPhotos.type);
        if (action.type === actions.setPhotos.type) {
          expect(action.newImages).toMatchObject([{ id: 'id', url: 'url' }]);
        }
        expect(getImagesSpy).toHaveBeenNthCalledWith(1, 10, 3, 3, 'all');
        done();
      });
    });

    it('should like image', (done) => {
      action$ = of(actions.likeImage({ imageId: '2' }));

      const sendVoteSpy = jest.spyOn(apiHome, 'sendVote');

      effects.likeImage$.subscribe((action) => {
        expect(sendVoteSpy).toHaveBeenNthCalledWith(1, 1, '2');
        expect(action.type).toBe(actions.setImageVoteId.type);
        if (action.type === actions.setImageVoteId.type) {
          expect(action.value).toBe(1);
          expect(action.voteId).toBe(3);
        }
        done();
      });
    });

    it('should dislike image', (done) => {
      action$ = of(actions.dislikeImage({ imageId: '2' }));

      const sendVoteSpy = jest.spyOn(apiHome, 'sendVote');

      effects.dislikeImage$.subscribe((action) => {
        expect(sendVoteSpy).toHaveBeenNthCalledWith(1, -1, '2');
        expect(action.type).toBe(actions.setImageVoteId.type);
        if (action.type === actions.setImageVoteId.type) {
          expect(action.value).toBe(-1);
          expect(action.voteId).toBe(3);
        }

        done();
      });
    });

    it('should call remove vote', (done) => {
      action$ = of(actions.removeVote({ imageId: '2', voteId: 3 }));

      const removeVoteSpy = jest
        .spyOn(apiHome, 'removeVote')
        .mockReturnValue(of({ mess: 'success' }));

      effects.removeVote$.subscribe((action) => {
        expect(removeVoteSpy).toHaveBeenNthCalledWith(1, 3);
        expect(action.type).toBe(actions.setImageVoteId.type);
        if (action.type === actions.setImageVoteId.type) {
          expect(action.value).toBe(0);
          expect(action.voteId).toBe(0);
        }

        done();
      });
    });

    it('should switch from favourite to not favourite', (done) => {
      action$ = of(actions.switchFavorite({ imageId: '3' }));

      const removeFavSpy = jest
        .spyOn(apiHome, 'removeFavorite')
        .mockReturnValue(of({ mess: 'success' }));

      store = getMockStore({
        selectors: [
          {
            selector: selectors.selectImages,
            value: [
              { imageId: '3', imageUrl: '3', isFavorite: true, favoriteId: 5 },
            ],
          },
        ],
      });

      effects.switchFav$.subscribe((action) => {
        expect(removeFavSpy).toHaveBeenNthCalledWith(1, 5);
        expect(action.type).toBe(actions.setFavorite.type);
        if (action.type === actions.setFavorite.type)
          expect(action.favoriteId).toBe(0);

        done();
      });
    });

    it('should switch from not favourite to favourite', (done) => {
      action$ = of(actions.switchFavorite({ imageId: '3' }));

      const setFavSpy = jest
        .spyOn(apiHome, 'setFavorite')
        .mockReturnValue(of({ mess: 'success', id: 5 }));

      store = getMockStore({
        selectors: [
          {
            selector: selectors.selectImages,
            value: [
              { imageId: '3', imageUrl: '3', isFavorite: false, favoriteId: 0 },
            ],
          },
        ],
      });

      effects.switchFav$.subscribe((action) => {
        expect(setFavSpy).toHaveBeenNthCalledWith(1, '3');
        expect(action.type).toBe(actions.setFavorite.type);
        if (action.type === actions.setFavorite.type)
          expect(action.favoriteId).toBe(5);

        done();
      });
    });

    it('should loadCategories', (done) => {
      action$ = of(actions.loadCategories());

      const categories = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
      ];

      const getCategorySpy = jest
        .spyOn(apiHome, 'getCategories')
        .mockReturnValue(of(categories));

      effects.loadCategories$.subscribe((action) => {
        expect(getCategorySpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.setCategories.type);
        if (action.type === actions.setCategories.type)
          expect(action.categories).toBe(categories);

        done();
      });
    });

    it('should loadBreeds', (done) => {
      action$ = of(actions.loadBreeds());

      const breeds = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
      ];

      const getBreedsSpy = jest
        .spyOn(apiHome, 'getBreeds')
        .mockReturnValue(of(breeds));

      effects.loadBreeds$.subscribe((action) => {
        expect(getBreedsSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.setBreeds.type);
        if (action.type === actions.setBreeds.type)
          expect(action.breeds).toBe(breeds);

        done();
      });
    });
  });

  describe('Reducer', () => {
    it('should set photos with favorite', () => {
      const initialState = { ...fromReducer.initialState };
      const newState = {
        images: [
          {
            favoriteId: 2,
            imageId: '3',
            imageUrl: 'url',
            isFavorite: true,
            vote: 0,
            voteId: 0,
          },
        ],
      };

      const action = actions.setPhotos({
        newImages: [{ id: '3', url: 'url', width: 10, height: 10 }],
        favImages: [
          {
            id: 2,
            image_id: '3',
            created_at: new Date(),
            image: { id: '3', url: 'url' },
          },
        ],
        voteImages: [],
      });

      const result = fromReducer.homeReducer(initialState, action);
      expect(result).toMatchObject(newState);
    });

    it('should set photos with vote', () => {
      const initialState = { ...fromReducer.initialState };
      const newState = {
        images: [
          {
            favoriteId: 0,
            imageId: '3',
            imageUrl: 'url',
            isFavorite: false,
            vote: 1,
            voteId: 2,
          },
        ],
      };

      const action = actions.setPhotos({
        newImages: [{ id: '3', url: 'url', width: 10, height: 10 }],
        favImages: [],
        voteImages: [
          {
            id: 2,
            image_id: '3',
            created_at: '1',
            image: { id: '3', url: 'url' },
            value: 1,
          },
        ],
      });

      const result = fromReducer.homeReducer(initialState, action);
      expect(result).toMatchObject(newState);
      expect(result).not.toBe(initialState);
    });

    it('should set image vote id', () => {
      const initialState = {
        ...fromReducer.initialState,
        images: [
          {
            imageId: '3',
            imageUrl: 'url',
            vote: 0,
            voteId: 0,
            isFavorite: false,
            favoriteId: 0,
          },
        ],
      };
      const newState = {
        images: [
          {
            imageId: '3',
            imageUrl: 'url',
            vote: 1,
            voteId: 2,
          },
        ],
      };

      const action = actions.setImageVoteId({
        value: 1,
        voteId: 2,
        imageId: '3',
      });

      const result = fromReducer.homeReducer(initialState, action);
      expect(result).toMatchObject(newState);
      expect(result).not.toBe(initialState);
    });

    it('should set image favorite', () => {
      const initialState = {
        ...fromReducer.initialState,
        images: [
          {
            imageId: '3',
            imageUrl: 'url',
            vote: 0,
            voteId: 0,
            isFavorite: false,
            favoriteId: 0,
          },
        ],
      };
      const newState = {
        images: [
          {
            imageId: '3',
            imageUrl: 'url',
            favoriteId: 2,
            isFavorite: true,
          },
        ],
      };

      const action = actions.setFavorite({ imageId: '3', favoriteId: 2 });

      const result = fromReducer.homeReducer(initialState, action);
      expect(result).toMatchObject(newState);
      expect(result).not.toBe(initialState);
    });
  });
});
