import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Image } from '../utils/image.interface';
import { Params } from '@angular/router';
import { Category } from '../utils/category.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeService {
  constructor(private httpClient: HttpClient) {}

  getImages(
    number: number,
    categoryId?: number | null,
    breedId?: number | null
  ) {
    let params = new HttpParams();
    if (categoryId) params = params.append('category_ids', categoryId);

    if (breedId) params = params.append('breed_ids', breedId);

    return this.httpClient.get<Image[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${number}`,
      { params }
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

  getCategories() {
    return this.httpClient.get<Category[]>(
      'https://api.thecatapi.com/v1/categories'
    );
  }

  getBreeds() {
    return this.httpClient.get<Category[]>(
      'https://api.thecatapi.com/v1/breeds'
    );
  }
}
