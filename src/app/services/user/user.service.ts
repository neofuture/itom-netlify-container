// noinspection NonAsciiCharacters,JSNonASCIINames

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import * as CryptoJS from 'crypto-js';
// noinspection NonAsciiCharacters
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {ApiService} from "../api/api.service";
import {environment} from "../../../environments/environment";

// noinspection JSNonASCIINames
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private objectSource = new BehaviorSubject('');
  jwt = new JwtHelperService();
  tokenUuid = '0207e946-52f5-494a-b49d-9ef61b54f907';
  credentialsToken = '0becf6f1-4f9e-4a24-8a45-36967f1a978f'
  credentialsOtpToken = 'fb3cf6f1-4f9e-4924-fa45-3b96cf14578e'
  api = environment

  constructor(
    private apiService: ApiService,
  ) {
  }

  password = 'uwedhiwudhiwudheid';

  userSubject = new BehaviorSubject({});
  user = this.userSubject.asObservable();

  initUsers() {
    if (this.decodeToken() !== null) {
      this.apiService.call(this.api.api + '/v1/user', 'get', {}).subscribe((response: any) => {
        if (response.success) {
          if (response.data.email_validated_at !== null && response.data.phone_validated_at !== null) {
            this.removeOtpCredentials();
          }
          this.userSubject.next(response.data);
        } else {
          this.userSubject.next({});
        }
      });
    }
  }

  setToken(token: any): void {
    const encryptedToken = CryptoJS.AES.encrypt(token, this.password.trim()).toString();
    this.objectSource.next(<string>this.jwt.decodeToken(token));
    localStorage.setItem(this.tokenUuid, encryptedToken);
  }

  getToken(): any {
    const token = localStorage.getItem(this.tokenUuid);
    if (token === 'false') {
      return null;
    }
    if (token !== null) {
      return CryptoJS.AES.decrypt(token, this.password.trim()).toString(CryptoJS.enc.Utf8);
    }
    return false;
  }

  unsetToken() {
    this.objectSource.next('');
    localStorage.removeItem(this.tokenUuid);
  }

  storeCredentials(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
    let credentials = JSON.stringify(value);
    let encryptedCredentials = CryptoJS.AES.encrypt(credentials, this.password.trim()).toString();
    localStorage.setItem(this.credentialsToken, encryptedCredentials);
  }

  getCredentials() {
    let credentials = localStorage.getItem(this.credentialsToken);
    if (credentials !== null) {
      return JSON.parse(CryptoJS.AES.decrypt(credentials, this.password.trim()).toString(CryptoJS.enc.Utf8));
    }
    return false;
  }

  storeOtpCredentials(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
    let credentials = JSON.stringify(value);
    let encryptedCredentials = CryptoJS.AES.encrypt(credentials, this.password.trim()).toString();
    localStorage.setItem(this.credentialsOtpToken, encryptedCredentials);
  }

  getOtpCredentials() {
    let credentials = localStorage.getItem(this.credentialsOtpToken);
    if (credentials !== null) {
      return JSON.parse(CryptoJS.AES.decrypt(credentials, this.password.trim()).toString(CryptoJS.enc.Utf8));
    }
    return false;
  }

  removeOtpCredentials() {
    localStorage.removeItem(this.credentialsOtpToken);
  }

  removeCredentials() {
    localStorage.removeItem(this.credentialsToken);
  }

  decodeToken() {
    let token = this.jwt.decodeToken(this.getToken());
    if (token === null) {
      return null;
    }
    if (Date.now() >= token.exp * 1000) {
      this.unsetToken();
      return null;
    }
    return token;
  }

  logout() {
    this.unsetToken();
    this.localStorageClear();
    this.userSubject.next({});
  }

  private localStorageClear() {
    localStorage.clear();
  }

  checkToken() {
    return this.decodeToken() !== null;
  }
}


// "aud":     This is the "audience" claim, and it identifies the intended recipient of the token.
//            The value is a unique identifier for the recipient.
// "jti":     This is the "JWT ID" claim, and it provides a unique identifier for the token.
//            This can be used to prevent token replay attacks.
// "iat":     This is the "issued at" claim, and it represents the time at which the token was issued,
//            as a Unix timestamp.
// "nbf":     This is the "not before" claim, and it represents the time before which the token should
//            not be accepted for processing. This can be used to prevent token replay attacks.
// "exp":     This is the "expiration time" claim, and it represents the time at which the token will
//            expire and can no longer be used.
// "sub":     This is the "subject" claim, and it identifies the subject of the token, such as a user ID.
// "scopes":  This is an optional claim, and it lists the scopes associated with the token, if any.
//            A scope is a string that defines the permissions associated with the token. An empty array
//            in this case indicates that the token doesn't have any associated scopes.
