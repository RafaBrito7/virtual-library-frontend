import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';

import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService : UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getLoggedUserToken();
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.hostUrl.split('/');
 
    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`,
              token: `${token}`
          }
      });
      return next.handle(request).pipe(catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401){
            this.userService.logout();
            return error;
          }
          else
            return throwError(error.message);
      }));
  }
  else {
      return next.handle(request);
  }
  }
}
