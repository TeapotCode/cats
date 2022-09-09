import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,Observable } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { Store } from '@ngrx/store';
import * as catsActions from '../../../shell/data-access/cats.action'
import * as catsSelector from '../../../shell/data-access/cats.selector'

@Injectable({
  providedIn: 'root'
})
export class ApiFavoritesService {

constructor(private store:Store, private http: HttpClient) { }

getFavorites():Observable<Favorites[]>
{
  this.store.dispatch(catsActions.loadFromApi());
  return this.store.select(catsSelector.selectFavouritesImages);
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
  return this.http.delete(
    `https://api.thecatapi.com/v1/votes/${voteId}`
  );
}

}
