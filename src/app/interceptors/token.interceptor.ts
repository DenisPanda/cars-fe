import { UiService } from './../services/ui.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Routes that don't require the token attached
 */
const EXCEPTIONS = [
  {
    url: /./,
    methods: new Set(['GET']),
  },
  {
    url: /\/login$/,
    methods: new Set(['POST']),
  },
  {
    url: /\/vehicles\/search/,
    methods: new Set(['POST']),
  },
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private aS: AuthService, private uiS: UiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let reqClone: typeof request = request;

    const jwt = this.aS.token;

    if (jwt) {
      const url = request.url;
      const method = request.method;

      // don't attach token to excepted endpoints
      if (
        !EXCEPTIONS.some((exc) => {
          url.match(exc.url) && exc.methods.has(method);
        })
      ) {
        // attach to all calls except checkout/order
        const setHeaders = {
          Authorization: `Bearer ${jwt}`,
        };

        reqClone = request.clone({
          setHeaders,
        });
      }
    }

    let obs = next.handle(reqClone);

    return obs.pipe(
      catchError((err) => {
        console.error('Error intercepted. Error: ', err);

        switch (err.status) {
          case 500:
            this.uiS.snack('Server error!');
            break;

          case 403:
            this.uiS.snack('Unauthorized!');
            this.aS.logout();
            break;

          default:
            break;
        }

        return throwError(() => err);
      })
    );
  }
}
