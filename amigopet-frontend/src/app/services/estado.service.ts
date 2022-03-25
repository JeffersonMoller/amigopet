import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  buscarEstados(): Observable<any> {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  buscarCidade(id?:string): Observable<any> {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ id + '/municipios');
  }
}
