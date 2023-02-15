import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ipAddress: any;

  constructor(
    private http: HttpClient
  ) {
  }

  call(url: string, requestType: string, body: any): Observable<any> {
    const httpOptions = this.headers();
    let data: any;
    if (requestType === 'get' || requestType === 'delete') {
      const params = new URLSearchParams(body).toString();
      data = this.http[requestType](url + (params ? '/?' + params : ''), httpOptions);
    }
    if (requestType === 'post' || requestType === 'put') {
      data = this.http[requestType](url, body, httpOptions);
    }
    return data.pipe(
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  headers(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  getIp() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  handleError(error: {
    data: any;
    status: number; error: { error: any; statusText: any; }; }): any {
    if (error.status === 500 || error.status === 405 || error.status === 403) {
      return throwError(error);
    } else {
      return [error];
    }
  }
}
