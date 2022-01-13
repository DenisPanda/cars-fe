import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { requestBody, responseBody } from '../types/http.types';

const URLS = {
  login: () => `${env.apiUri}/login`
}

@Injectable({
  providedIn: 'root',
})
export class FetchApiService {
  constructor(private http: HttpClient) {}

  login(body: requestBody.Login): Observable<responseBody.Login> {
    return this.http.post<responseBody.Login>(URLS.login(), body);
  }
}
