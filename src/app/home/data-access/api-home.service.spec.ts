import { TestBed } from '@angular/core/testing';

import { ApiHomeService } from './api-home.service';

describe('ApiService', () => {
  let service: ApiHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
