import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * namespace for session storage items
 */
enum SSNamespace {
  TOKEN = 'session_storage_token',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = this.tokenFromCache();
  loggedIn$ = new BehaviorSubject(!!this._token);

  constructor(private router: Router) {}

  get token(): string | null {
    return this._token;
  }

  set token(t: string | null) {
    if (t !== this._token) {
      if (t) {
        this._token = t;
        this.loggedIn$.next(true);
      } else {
        this._token = null;
        this.loggedIn$.next(false);
      }
    }
  }

  login(token: string): void {
    this.token = token;

    this.router.navigate(env.afterLoginRoute)
  }

  logout(): void {
    this.token = null;
    this.clearSessionStorage();
  }

  tokenFromCache(): string | null {
    const token = sessionStorage.getItem(SSNamespace.TOKEN);

    return token || null;
  }

  saveTokenToCache(token: string | null): void {
    if (token) {
      sessionStorage.setItem(SSNamespace.TOKEN, token);
    } else {
      sessionStorage.removeItem(SSNamespace.TOKEN);
    }
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  clearAll(): void {
    this.clearSessionStorage();
  }
}
