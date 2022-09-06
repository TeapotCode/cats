import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVotesComponent } from './display-votes.component';

describe('DisplayVotesComponent', () => {
  let component: DisplayVotesComponent;
  let fixture: ComponentFixture<DisplayVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayVotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
