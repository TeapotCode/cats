import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Images } from '../../utilities/images.model';

@Injectable({
  providedIn: 'root',
})
export class ApiVotesService {
  url = 'https://api.thecatapi.com/v1/votes';

  constructor(private http: HttpClient) {}

  getImagesVote(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.url}`);
  }
}
