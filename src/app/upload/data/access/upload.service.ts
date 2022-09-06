import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = 'https://api.thecatapi.com/v1/images/upload';
  headers = new HttpHeaders({
    'x-api-key': environment.API_KEY,
  })
  options = {
    headers: this.headers,
  }

  public upload(file: File) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post(this.SERVER_URL, formData, this.options);
  }

  constructor(private httpClient: HttpClient) { }
}
