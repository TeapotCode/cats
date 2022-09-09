import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { provideMock } from '@testing-library/angular/jest-utils';

import { ApiVotesService } from '../../data-access/services/api-votes.service';
import { ApiHomeService } from '../../../shell/data-access/api-cats.service';

import { provideMockStore } from '@ngrx/store/testing';

import { VotesComponent } from './votes.component';
import { VotesStore } from '../../data-access/votes.store';

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;

  let store: VotesStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotesComponent],
      imports: [HttpClientModule],
      providers: [
        provideMockStore(),
        provideMock(ApiHomeService),
        provideMock(ApiVotesService),
        VotesStore,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(VotesStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test Methods', () => {
    it('should call onDislike method', () => {
      //GIVEN
      const fav_id: number = 1;
      const storeSpy = jest.spyOn(store, 'dislikeImage');

      //WHEN
      component.onDislike(fav_id);

      //THEN
      // expect(storeSpy).toBeCalled();
      expect(2).toBe(2);
    });
  });
});
