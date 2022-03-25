import { TokenServiceService } from './token-service.service';
import { AuthService } from './auth.service';
import { Usuario } from './../beans/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private tokenService: TokenServiceService) { }


  cadastrarUsuario(usuario: Usuario) {
    return this.http.post('http://localhost:8080/usuario/cadastrar', usuario);
  }

  alterar(usuario: Usuario) {
    return this.http.put('http://localhost:8080/usuario/alterar/' + usuario.id, usuario, this.getAuthHeaders())
    .subscribe(
      (data:any) => {
        this.tokenService.removeToken();
        this.tokenService.setToken(data.token);
        window.alert("alterado com sucesso!");
      }, (error) => {
        window.alert("Email ja cadastrado!");
        console.log(error.error.message);
      }
    )
  }

  getAuthHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
    return httpOptions;
  }
}
