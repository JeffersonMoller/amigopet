import { TokenServiceService } from './../services/token-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../beans/Animal';
import { Cidade } from '../beans/Cidade';
import { Estado } from '../beans/Estado';
import { AnimalService } from '../services/animal.service';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss'],
})
export class EditAnimalComponent implements OnInit {
  uri = 'localhost:8080/animal/';

  estados: Observable<Estado[]> = new Observable();
  cidades: Observable<Cidade[]> = new Observable();
  idEstadoSelecionado: string = '0';
  animal: Animal = {};

  constructor(
    private estadoServico: EstadoService,
    private animalServico: AnimalService,
    private tokenServico: TokenServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buscar();
    this.getAnimalById(this.route.snapshot.paramMap.get('id'))

  }

  buscar() {
    this.estados = this.estadoServico.buscarEstados();
  }

  buscarCidade() {
    this.cidades = this.estadoServico.buscarCidade(this.idEstadoSelecionado);
    this.cidades.subscribe((resolve) => console.log(resolve));
  }

  getAnimalById(id:any){
    this.animalServico.getAnimalById(id).subscribe(
      (data:any) => {
        this.animal.id = data.id;
        this.animal.nome = data.nome;
        this.animal.tipo = data.tipo;
        this.animal.raca = data.raca;
        this.animal.idade = data.idade;
        this.animal.descricao = data.descricao;
        this.animal.estado = data.estado;
        this.animal.cidade = data.cidade;
        this.animal.sexo = data.sexo;
        this.animal.porte = data.porte;
        this.animal.status = data.status;
      }
    );
  }

  salvar(){
    this.tokenServico.getUser().subscribe(
      (data:any) => {
        this.animal.usuario = data;
      }
    );
    this.animalServico.editarAnimalById(this.animal).subscribe(
      resolve => {
        window.alert('Alterado com sucesso');
      }, err => {
        console.log(err.erro.mensage);
      }
    );
  }
}
