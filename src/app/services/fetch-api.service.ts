import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { requestBody, responseBody } from '../types/http.types';
import { urlHelpers } from '../utils';

const URLS = {
  login: () => `${env.apiUri}/login`,
  // @TODO: should be changed to an object instead of parameters
  getVehicles: (
    page: number,
    pageSize: number,
    sort: string | null,
    sortOrder: 1 | -1 | null,
    searchTerm: string | null,
    searchAttribute: string | null
  ) => {
    return (
      `${env.apiUri}/vehicles?${urlHelpers.paginationParams(page, pageSize)}` +
      `${
        sort && sortOrder ? `&${urlHelpers.sortParams(sort, sortOrder)}` : ''
      }` +
      `${
        searchTerm && searchAttribute
          ? `&${urlHelpers.searchParams(searchAttribute, searchTerm)}`
          : ''
      }`
    );
  },
  createUser: () => `${env.apiUri}/user`,
  createVehicle: () => `${env.apiUri}/vehicle`,
};

@Injectable({
  providedIn: 'root',
})
export class FetchApiService {
  constructor(private http: HttpClient) {}

  login(body: requestBody.Login): Observable<responseBody.LoginBody> {
    return this.http
      .post<responseBody.Login>(URLS.login(), body)
      .pipe(map((res) => res.data));
  }

  getVehicles(
    page = 1,
    pageSize = 10,
    sort: string | null = null,
    sortOrder: 1 | -1 | null = null,
    searchTerm: string | null,
    searchAttribute: string | null
  ): Observable<responseBody.GetVehicles> {
    return this.http.get<responseBody.GetVehicles>(
      URLS.getVehicles(page, pageSize, sort, sortOrder, searchTerm, searchAttribute)
    );
  }

  createVehicle(
    body: requestBody.CreateVehicle
  ): Observable<responseBody.CreateVehicleBody> {
    return this.http
      .post<responseBody.CreateVehicle>(URLS.createVehicle(), body)
      .pipe(map((res) => res.data));
  }

  createUser(
    body: requestBody.CreateUser
  ): Observable<responseBody.CreateUserBody> {
    return this.http
      .post<responseBody.CreateUser>(URLS.createUser(), body)
      .pipe(map((res) => res.data));
  }
}
