import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.image = {
      imageId: '3',
      imageUrl: 'url',
      vote: 0,
      voteId: 3,
      isFavorite: false,
      favoriteId: 0,
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
