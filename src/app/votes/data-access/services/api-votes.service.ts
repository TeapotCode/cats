import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';

import * as catsSelectors from '../../../shell/data-access/cats.selector';
import { voteImages } from '../../utilities/votesImages.model';
import {
  loadFromApi,
  setImagesWithVote,
} from '../../../shell/data-access/cats.action';

@Injectable({
  providedIn: 'root',
})
export class ApiVotesService {
  constructor(private store: Store, private http: HttpClient) {}

  getVotedImages(): Observable<voteImages[]> {
    this.store.dispatch(loadFromApi());
    return this.store.select(catsSelectors.selectVotedImages);
  }
}
