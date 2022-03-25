
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * DI
   * @param auth un service d'auth qui  donnera le token si besoin
   */
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.auth.isAuthenticated()) {
      return next.handle(req);
    }
    const token = this.auth.getToken();
    const clonedReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token)
    });

    return next.handle(clonedReq);
  }
}
