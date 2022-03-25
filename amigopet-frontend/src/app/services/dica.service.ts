import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dica } from '../beans/Dica';

@Injectable({
  providedIn: 'root'
})
export class DicaService {

  constructor(public http:HttpClient) { }

  cadastrarDica(dica:Dica){
    return this.http.post('http://localhost:8080/dica/cadastrar', dica, this.getAuthHeader());

  }

  getAllDicas(): Observable<any>{
    return this.http.get('http://localhost:8080/dica/lista',  this.getAuthHeader());
  }

  getAuthHeader(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken') })
    };
    return httpOptions;
  }

  getDicaById(id:number) {
    return this.http.get('http://localhost:8080/dica/visualizar/'+ id, this.getAuthHeader());
  }

  getDicasByIdUsers(id:string): Observable<any>{
    return this.http.get('http://localhost:8080/dica/listarporusuario/' + id, this.getAuthHeader());
  }

  alterarDica(dica:Dica){
    return this.http.put('http://localhost:8080/dica/alterar/' + dica.id, dica, this.getAuthHeader());
  }

  excluirDica(id?:number){
    return this.http.delete('http://localhost:8080/dica/deletar/' + id, this.getAuthHeader());
  }
}
