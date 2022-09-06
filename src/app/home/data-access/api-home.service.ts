import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../utils/image.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeService {
  constructor(private httpClient: HttpClient) {}

  getImages(number: number) {
    return this.httpClient.get<Image[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${number}`
    );
  }

  sendVote(value: number, imageId: string) {
    return this.httpClient.post<{ message: string; id: number }>(
      'https://api.thecatapi.com/v1/votes',
      {
        image_id: imageId,
        value,
      }
    );
  }

  removeVote(voteId: number) {
    return this.httpClient.delete(
      `https://api.thecatapi.com/v1/votes/${voteId}`
    );
  }

  setFavorite(imageId: string) {
    return this.httpClient.post('https://api.thecatapi.com/v1/favourites', {
      image_id: imageId,
    });
  }

  removeFavorite(favoriteId: number) {
    return this.httpClient.delete(
      `https://api.thecatapi.com/v1/favourites/${favoriteId}`
    );
  }
}
