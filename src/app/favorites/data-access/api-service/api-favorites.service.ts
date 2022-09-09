import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { Store } from '@ngrx/store';
import {
  loadFromApi,
  setNotification,
} from 'src/app/shell/data-access/cats.action';
import { selectFavouritesImages } from 'src/app/shell/data-access/cats.selector';
import { Notification } from '../../../shell/utils/notification.model';

@Injectable({
  providedIn: 'root',
})
export class ApiFavoritesService {
  constructor(private store: Store, private http: HttpClient) {}

  getFavorites(): Observable<Favorites[]> {
    this.store.dispatch(loadFromApi());
    return this.store.select(selectFavouritesImages);
  }

  sendVote(value: number, imageId: string) {
    return this.http.post<{ message: string; id: number }>(
      'https://api.thecatapi.com/v1/votes',
      {
        image_id: imageId,
        value,
      }
    );
  }

  removeVote(voteId: number) {
    return this.http.delete(`https://api.thecatapi.com/v1/votes/${voteId}`);
  }

  setNotifications(notifi: Notification) {
    this.store.dispatch(setNotification({ notifi }));
  }
}
