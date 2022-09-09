import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';

import { ApiFavoritesService } from '../../data-access/api-service/api-favorites.service';
import { ApiHomeService } from '../../../shell/data-access/api-cats.service';

import { provideMockStore } from '@ngrx/store/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesStore } from '../../data-access/api-service/favorites.store'
import { HttpClientModule } from '@angular/common/http';

import { toVote } from '../../utils/toVote'

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  let store:FavoritesStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports:[HttpClientModule],
      providers:[
        provideMockStore(),
        provideMock(ApiFavoritesService),
        provideMock(ApiHomeService),
        FavoritesStore
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store=TestBed.inject(FavoritesStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test Methods',()=>{
    it('should call like method',()=>{
      //GIVEN
      const ToVote:toVote={image_id:'1',voteId:1,vote:-1}
      const spy=jest.spyOn(store,'like')
      // WHEN
      component.like(ToVote);
      // THEN
      expect(spy).toBeCalled
    })
  });

  describe('Test Methods',()=>{
    it('should call dislike method',()=>{
      //GIVEN
      const ToVote:toVote={image_id:'1',voteId:1,vote:1}
      const spy=jest.spyOn(store,'dislike')
      // WHEN
      component.dislike(ToVote);
      // THEN
      expect(spy).toBeCalled
    })
  })
});
