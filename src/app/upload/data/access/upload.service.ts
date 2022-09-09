import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Image} from "../../utilities/ImagesInterface";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private SERVER_URL: string = 'https://api.thecatapi.com/v1/images';
  private headers = new HttpHeaders({
    'x-api-key': environment.API_KEY,
  })
  private options = {
    headers: this.headers,
  }

  public upload(file: File) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post(`${this.SERVER_URL}/upload`, formData, this.options);
  }

  public getUploadedImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${this.SERVER_URL}/?limit=20`, this.options);
  }

  public deleteImage(image: Image) {
    return this.httpClient.delete(`${this.SERVER_URL}/${image.id}`, this.options)
  }

  constructor(private httpClient: HttpClient) { }
}
