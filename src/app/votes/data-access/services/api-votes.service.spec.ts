import { TestBed } from '@angular/core/testing';

import { ApiVotesService } from './api-votes.service';

describe('ApiVotesService', () => {
  let service: ApiVotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
