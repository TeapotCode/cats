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
    return this.httpClient.post('https://api.thecatapi.com/v1/votes', {
      image_id: imageId,
      value,
    });
  }
}