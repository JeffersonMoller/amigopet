import { TokenServiceService } from './token-service.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from '../beans/Animal';



@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalBehaviorSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient, private tokenService:TokenServiceService ) { }

  listarAnimais(): Observable<any> {
    return this.http.get('http://localhost:8080/animal/lista', this.getAuthHeaders());
  }

  salvarAnimal(animal:Animal){
    return this.http.post('http://localhost:8080/animal/cadastrar', animal, this.getAuthHeaders());
  }

  getAnimalById(id:number){
    return this.http.get('http://localhost:8080/animal/visualizar/' + id, this.getAuthHeaders());
  }

  getAuthHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken') })
    };
    return httpOptions;
  }

  getAnimalByUser(id:string): Observable<any>{
    return this.http.get('http://localhost:8080/animal/listarporusuario/' + id, this.getAuthHeaders());
  }

  editarAnimalById(animal:Animal){
    return this.http.put('http://localhost:8080/animal/alterar/' + animal.id, animal, this.getAuthHeaders());
  }

  listaAnimalByStatus(status:string, id:string): Observable<any>{
    return this.http.get('http://localhost:8080/animal/listarporStatus/'+ id + '/' + status, this.getAuthHeaders());
  }

  filtarAnimal(animal:Animal){
    return this.http.post('http://localhost:8080/animal/listarcomfiltro', animal, this.getAuthHeaders());
  }

  setAnimais(animal:Animal){
    this.animalBehaviorSubject.next(animal);
  }

  getAnimais(){
    return this.animalBehaviorSubject;
  }

}
