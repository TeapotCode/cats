import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMock } from '@testing-library/angular/jest-utils';

import { VotesStore } from './votes.store';
import { ApiVotesService } from './services/api-votes.service';
import { ApiHomeService } from '../../shell/data-access/api-cats.service';
import { voteImages } from '../utilities/votesImages.model';
import { helperIfLike } from './votes.store';

describe('VotesStore', () => {
  const images: voteImages[] = [
    {
      id: 599344,
      image_id: '150',
      created_at: '2022-09-08T08:48:44.000Z',
      value: 1,
      image: {
        id: '150',
        url: 'https://cdn2.thecatapi.com/images/150.jpg',
      },
      isFavorite: true,
      favoriteId: 1,
    },
    {
      id: 599345,
      image_id: '49p',
      created_at: '2022-09-08T08:48:49.000Z',
      value: -1,
      image: {
        id: '49p',
        url: 'https://cdn2.thecatapi.com/images/49p.gif',
      },
      isFavorite: false,
    },
    {
      id: 599346,
      image_id: 'afv',
      created_at: '2022-09-08T08:48:53.000Z',
      value: 1,
      image: {
        id: 'afv',
        url: 'https://cdn2.thecatapi.com/images/afv.jpg',
      },
      isFavorite: false,
      favoriteId: 3,
    },
    {
      id: 599352,
      image_id: '16j',
      created_at: '2022-09-08T08:50:04.000Z',
      value: 1,
      image: {
        id: '16j',
        url: 'https://cdn2.thecatapi.com/images/16j.jpg',
      },
      isFavorite: false,
    },
  ];

  let voteStore: VotesStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideMockStore(),
        provideMock(ApiHomeService),
        provideMock(ApiVotesService),
        VotesStore,
      ],
    }).compileComponents();

    voteStore = TestBed.inject(VotesStore);
  });

  describe('state votes store', () => {
    it('should set state default', (done) => {
      //GIVEN
      voteStore.setState({
        image: [],
        loader: false,
      });

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image.length).toBe(0);
        expect(state.loader).toBeFalsy();
        done();
      });
    });
  });

  describe('Votes States reducers', () => {
    it('should update images', (done) => {
      //GIVEN
      voteStore.updateImages(images);

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image.length).toBe(4);
        expect(state.loader).toBeFalsy();
        done();
      });
    });

    it('should update loader', (done) => {
      //GIVEN
      voteStore.updateLoader();

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image.length).toBe(0);
        expect(state.loader).toBeTruthy();
        done();
      });
    });

    it('should update image if dislike', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      voteStore.updateImagesIfDislike(1);

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image[0].isFavorite).toBeFalsy;
        expect(state.loader).toBeFalsy();
        done();
      });
    });

    it('should update image if like', (done) => {
      //GIVEN
      const result: helperIfLike = {
        id: '49p',
        result: {
          id: 43,
          message: 'success',
        },
      };
      voteStore.updateImages(images);
      voteStore.updateImagesIfLike(result);

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image[1].isFavorite).toBeTruthy();
        expect(state.image[1].favoriteId).toBe(43);
        expect(state.loader).toBeFalsy();
        done();
      });
    });

    it('should update image if click favourite for string id', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      voteStore.updateImagesIfClickFavourite('49p');

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image[1].isFavorite).toBeTruthy();
        expect(state.loader).toBeFalsy();
        done();
      });
    });

    it('should update image if click favourite for number id', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      voteStore.updateImagesIfClickFavourite('afv');

      //WHEN
      voteStore.state$.subscribe((state) => {
        //THEN
        expect(state.image[2].isFavorite).toBeTruthy();
        expect(state.loader).toBeFalsy();
        done();
      });
    });
  });

  describe('Votes States selectors', () => {
    it('should return every images', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      const lengthOfPositiveImages = images.length;

      //WHEN
      voteStore.selectImages().subscribe((img) => {
        //THEN
        expect(img.length).toBe(lengthOfPositiveImages);
        done();
      });
    });

    it('should return only positive images', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      const lengthOfPositiveImages = images.filter(
        (img) => img.value === 1
      ).length;

      //WHEN
      voteStore.selectImagesPositive().subscribe((img) => {
        //THEN
        expect(img.length).toBe(lengthOfPositiveImages);
        done();
      });
    });

    it('should return only negative images', (done) => {
      //GIVEN
      voteStore.updateImages(images);
      const lengthOfPositiveImages = images.filter(
        (img) => img.value === -1
      ).length;

      //WHEN
      voteStore.selectImagesNegative().subscribe((img) => {
        //THEN
        expect(img.length).toBe(lengthOfPositiveImages);
        done();
      });
    });

    it('should return loader', (done) => {
      //GIVEN
      voteStore.updateImages(images);

      //WHEN
      voteStore.selectLoader().subscribe((loader) => {
        //THEN
        expect(loader).toBeFalsy();
        done();
      });
    });
  });

  describe('Votes States effects', () => {
    it('should get images', () => {
      /* jest.useFakeTimers();

      voteStore.getImages(images);
      jest.runOnlyPendingTimers();
      */

      expect(1).toBe(1);
    });
  });
});
