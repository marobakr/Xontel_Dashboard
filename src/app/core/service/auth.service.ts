import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from '../env/baseApis';
import { ILogin } from '../interfaces/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  login(loginUser: ILogin) {
    return this._httpClient.post<any>(`${auth}/api/users/auth`, loginUser);
  }
  authorized(): boolean {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('token') != null
    ) {
      return true;
    } else return false;
  }

  logout() {
    return this._httpClient.post<any>(`${auth}/api/users/logout`, {});
  }
}
