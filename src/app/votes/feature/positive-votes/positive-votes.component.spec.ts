import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveVotesComponent } from './positive-votes.component';

describe('PositiveVotesComponent', () => {
  let component: PositiveVotesComponent;
  let fixture: ComponentFixture<PositiveVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositiveVotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositiveVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
