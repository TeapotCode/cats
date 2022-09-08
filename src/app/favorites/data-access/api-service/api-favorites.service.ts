import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,Observable } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { Store } from '@ngrx/store';
import { loadFromApi } from 'src/app/shell/data-access/cats.action';
import { selectFavouritesImages } from 'src/app/shell/data-access/cats.selector';

@Injectable({
  providedIn: 'root'
})
export class ApiFavoritesService {

constructor(private store:Store) { }

getFavorites():Observable<Favorites[]>
{
  this.store.dispatch(loadFromApi());
  return this.store.select(selectFavouritesImages);
}

}
