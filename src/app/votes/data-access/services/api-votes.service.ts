import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { selectVotedImages } from '../../../shell/data-access/cats.selector';
import { voteImages } from '../../utilities/votesImages.model';
import {
  loadFromApi,
  setNotification,
} from '../../../shell/data-access/cats.action';
import { Notification } from '../../../shell/utils/notification.model';

@Injectable({
  providedIn: 'root',
})
export class ApiVotesService {
  constructor(private store: Store) {}

  getVotedImages(): Observable<voteImages[]> {
    this.store.dispatch(loadFromApi());
    return this.store.select(selectVotedImages);
  }

  setNotifications(notifi: Notification) {
    this.store.dispatch(setNotification({ notifi }));
  }
}
