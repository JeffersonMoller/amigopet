import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../beans/Animal';
import { Usuario } from '../beans/Usuario';
import { AnimalService } from '../services/animal.service';
import { TokenServiceService } from '../services/token-service.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(private animalServico:AnimalService, private userServico: TokenServiceService) { }

  animais: Observable<Animal[]> = new Observable();
  user?: Observable<Usuario>;
  idUsuario:string = "0";

  ngOnInit(): void {
    this.userServico.getUser()
    .subscribe(
      (resolve) => {
        this.idUsuario = resolve.id;
        this.getAnimaisByIdUser();
      }
    );
  }

  getAnimaisByIdUser(){
    this.animais = this.animalServico.getAnimalByUser(this.idUsuario);
  }

  doados(){
    this.animais = this.animalServico.listaAnimalByStatus('D', this.idUsuario);
  }
  ativos(){
    this.animais = this.animalServico.listaAnimalByStatus('A', this.idUsuario);
  }

}
