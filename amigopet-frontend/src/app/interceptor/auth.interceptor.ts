import { TokenStorageService } from './../services/token-storage.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Authinterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true },
];
