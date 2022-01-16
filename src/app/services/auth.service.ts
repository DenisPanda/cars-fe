import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * namespace for session storage items
 */
enum SSNamespace {
  TOKEN = 'session_storage_token',
  USER = 'session_storage_user',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = this.tokenFromCache();
  loggedIn$ = new BehaviorSubject(!!this._token);

  /**
   * Currently logged in user
   */
  user: null | { email: string } = this.userFromCache();

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

  get loggedIn(): boolean {
    return !!this.loggedIn$.value;
  }

  login(token: string, email: string): void {
    this.token = token;
    this.user = { email };

    this.saveTokenToCache();
    this.saveUserToCache();

    this.router.navigate(env.afterLoginRoute);
  }

  logout(): void {
    this.token = null;
    this.clearSessionStorage();
  }

  tokenFromCache(): string | null {
    const token = sessionStorage.getItem(SSNamespace.TOKEN);

    return token || null;
  }

  userFromCache(): {email: string} | null {
    const user = sessionStorage.getItem(SSNamespace.USER);

    return user && JSON.parse(user) || null;
  }

  saveTokenToCache(): void {
    if (this.token) {
      sessionStorage.setItem(SSNamespace.TOKEN, this.token);
    } else {
      sessionStorage.removeItem(SSNamespace.TOKEN);
    }
  }

  saveUserToCache(): void {
    if (this.user) {
      sessionStorage.setItem(SSNamespace.USER, JSON.stringify(this.user));
    } else {
      sessionStorage.removeItem(SSNamespace.USER);
    }
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  clearAll(): void {
    this.clearSessionStorage();
  }
}
