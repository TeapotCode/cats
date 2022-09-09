/* tslint:disable:no-unused-variable */
import { provideMock } from '@testing-library/angular/jest-utils';
import { provideMockStore } from '@ngrx/store/testing';
import { FavoritesStore } from '../../data-access/api-service/favorites.store'


import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { ApiFavoritesService } from './api-favorites.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: ApiFavorites', () => {

  let injector:TestBed;
  let service:ApiFavoritesService;
  let httpmock:HttpTestingController;
  let store:FavoritesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiFavoritesService,
        provideMockStore(),
        FavoritesStore],
      imports:[HttpClientTestingModule]
    });
    injector=getTestBed();
    service=injector.get(ApiFavoritesService);
    httpmock=injector.get(HttpTestingController);
    store=TestBed.inject(FavoritesStore);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should ...', inject([ApiFavoritesService], (service: ApiFavoritesService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getFavorites function',()=>{
    const service:ApiFavoritesService=TestBed.get(ApiFavoritesService);
    expect(service.getFavorites).toBeTruthy();
  })
  it('should have sendVote function',()=>{
    const service:ApiFavoritesService=TestBed.get(ApiFavoritesService);
    expect(service.sendVote).toBeTruthy();
  })
  it('should have removeVote function',()=>{
    const service:ApiFavoritesService=TestBed.get(ApiFavoritesService);
    expect(service.removeVote).toBeTruthy();
  })

  it('should return an Observable<Favorites[]>',()=>{
    const dummycats=[
      {
        id:         1,
        image_id:   "1",
        image: {
            id: "1",
            url: "1",
        },
        voteId: 1,
        vote: 1,
    },
    {
      id:         2,
      image_id:   "2",
      image: {
          id: "2",
          url: "2",
      },
      voteId: 2,
      vote: 2,
  }];
  service.getFavorites().subscribe(cats=>{
    expect(cats.length).toBe(2);
    expect(cats).toEqual(dummycats);
  });
  })
  });
