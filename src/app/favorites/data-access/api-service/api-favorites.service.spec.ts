/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiFavoritesService } from './api-favorites.service';

describe('Service: ApiFavorites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFavoritesService]
    });
  });

  it('should ...', inject([ApiFavoritesService], (service: ApiFavoritesService) => {
    expect(service).toBeTruthy();
  }));
});
