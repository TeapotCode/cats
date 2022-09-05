import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeVotesComponent } from './negative-votes.component';

describe('NegativeVotesComponent', () => {
  let component: NegativeVotesComponent;
  let fixture: ComponentFixture<NegativeVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegativeVotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegativeVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
