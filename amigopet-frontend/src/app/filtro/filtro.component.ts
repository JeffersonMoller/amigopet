import { EstadoService } from './../services/estado.service';
import { Estado } from './../beans/Estado';
import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cidade } from '../beans/Cidade';
import { AnimationAnimateChildMetadata } from '@angular/animations';
import { Animal } from '../beans/Animal';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  constructor(private estadoServico: EstadoService, private animalServico: AnimalService) { }

  estados: Observable<Estado[]> = new Observable();
  cidades: Observable<Cidade[]> = new Observable();
  idEstadoSelecionado: string = '0';
  idCidadeSelecionada: string = '0';

  animal:Animal = {porte: "0", sexo: "0", idade: "0", tipo: "0"};
  animais: Observable<any[]> = new Observable
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.estados = this.estadoServico.buscarEstados();
  }


  buscarCidade() {
    this.cidades = this.estadoServico.buscarCidade(this.idEstadoSelecionado);
    this.cidades.subscribe(
      resolve => console.log(resolve)
    );
  }

  filtrar(){
    this.animal.estado = this.idEstadoSelecionado;
    this.animal.cidade = this.idCidadeSelecionada;
    this.animalServico.filtarAnimal(this.animal).subscribe(
      resolve => {
        console.log(resolve);
        this.animalServico.setAnimais(resolve);
        this.animais = this.animalServico.getAnimais();
      }
      ,
      error => {
        console.error(error);
      }
    );
  }
}
