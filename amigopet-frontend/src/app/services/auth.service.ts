import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Usuario } from './../beans/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'http://localhost:8080/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(usuario: Usuario): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        email: usuario.email,
        senha: usuario.senha,
      },
      httpOptions
    );
  }

}
