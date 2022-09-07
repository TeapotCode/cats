import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { selectVotedImages } from '../../../shell/data-access/cats.selector';
import { voteImages } from '../../utilities/votesImages.model';
import { loadFromApi } from '../../../shell/data-access/cats.action';

@Injectable({
  providedIn: 'root',
})
export class ApiVotesService {
  constructor(private store: Store) {}

  getVotedImages(): Observable<voteImages[]> {
    this.store.dispatch(loadFromApi());
    return this.store.select(selectVotedImages);
  }
}
