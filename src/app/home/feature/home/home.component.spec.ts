import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { provideMockStore } from '@ngrx/store/testing';
import { CardComponent } from '../../ui/card/card.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollingModule],
      declarations: [HomeComponent, CardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
