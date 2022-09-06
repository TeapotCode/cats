import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,Observable } from 'rxjs';
import { Favorites } from '../../utils/favorites';

@Injectable({
  providedIn: 'root'
})
export class ApiFavoritesService {

constructor(private http:HttpClient) { }

API:string="https://api.thecatapi.com/v1/votes"

getFavorites():Observable<Favorites[]>
{
  return this.http.get<Favorites[]>(this.API);
}

}
