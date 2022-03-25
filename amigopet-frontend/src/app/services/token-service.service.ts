import { Usuario } from './../beans/Usuario';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenServiceService {

  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.hasToken() && this.decodeAndNotify();
  }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
    this.decodeAndNotify();
  }

  private decodeAndNotify() {
    let token = (this.getToken() || '{}');
      const user = jwt_decode(token) as Usuario;
      this.userSubject.next(user);

  }

  getUser(){
    return this.userSubject.asObservable();
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
