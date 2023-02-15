import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../services/user/user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public userService: UserService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();

    if(request.url.includes('ipify.org')){
      return next.handle(request);
    }

    if (token !== '') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
