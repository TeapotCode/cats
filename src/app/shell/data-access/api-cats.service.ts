import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../utils/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeService {
  constructor(private httpClient: HttpClient) {}

  getImages(number: number) {
    return this.httpClient.get<Api.RandomImage[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${number}`
    );
  }

  getFavourites() {
    return this.httpClient.get<Api.FavoriteImage[]>(
      'https://api.thecatapi.com/v1/favourites'
    );
  }

  getVotes() {
    return this.httpClient.get<Api.VoteImage[]>(
      'https://api.thecatapi.com/v1/votes'
    );
  }

  sendVote(value: number, imageId: string) {
    return this.httpClient.post('https://api.thecatapi.com/v1/votes', {
      image_id: imageId,
      value,
    });
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
