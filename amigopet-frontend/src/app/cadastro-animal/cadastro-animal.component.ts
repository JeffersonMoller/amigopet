import { TokenServiceService } from './../services/token-service.service';
import { AnimalService } from './../services/animal.service';
import { Animal } from './../beans/Animal';
import { EstadoService } from './../services/estado.service';
import { Estado } from './../beans/Estado';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cidade } from '../beans/Cidade';
import { Usuario } from '../beans/Usuario';

@Component({
  selector: 'app-cadastro-animal',
  templateUrl: './cadastro-animal.component.html',
  styleUrls: ['./cadastro-animal.component.scss'],
})
export class CadastroAnimalComponent implements OnInit {
  uri = 'localhost:8080/animal/';
  estados: Observable<Estado[]> = new Observable();
  cidades: Observable<Cidade[]> = new Observable();
  idEstadoSelecionado?: string = '0';
  idCidadeSelecionada?: string = '0';
  sexoAnimal?: string = '0';

  idadeAnimal?: number;
  cidadeNome?: string = '0';
  animais?: Animal[];
  animal: Animal = { tipo: "0", porte: "0" };
  user$: Observable<Usuario>;
  user: Usuario = {};

  constructor(
    private estadoServico: EstadoService,
    private animalServico: AnimalService,
    private tokenService: TokenServiceService
  ) {
    this.user$ = tokenService.getUser();
    this.user$.subscribe((resolve) => {
      this.user.id = resolve.id;
      this.user.nome = resolve.nome;
      this.user.email = resolve.email;
      this.user.celular = resolve.celular;
    });
  }

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.estados = this.estadoServico.buscarEstados();
    this.estados.subscribe((resolve) => console.log(resolve));
  }

  buscarCidade() {
    this.cidades = this.estadoServico.buscarCidade(this.idEstadoSelecionado);
  }

  salvar() {
    if (this.animal.nome != null) {
      if (this.idadeAnimal != null && this.idadeAnimal >= 0) {
        if (this.idadeAnimal >= 0 && this.idadeAnimal <= 3) {
          this.animal.idade = 'Filhote';
        } else if (this.idadeAnimal >= 3 && this.idadeAnimal < 7) {
          this.animal.idade = 'Adulto';
        } else if (this.idadeAnimal >= 7) {
          this.animal.idade = 'Idoso';
        }
      }
      this.animal.status = 'A';
      this.animal.sexo = this.sexoAnimal;
      this.animal.estado = this.idEstadoSelecionado;
      this.animal.cidade = this.idCidadeSelecionada;
      this.animal.usuario = this.user;

      this.animalServico.salvarAnimal(this.animal).subscribe(
        (animal: any) => {
          alert('Animal ' + animal.nome + ' Salvo com sucesso!');
        },
        (error) => {
          console.log(error);
        }
      );
      this.animal = new Animal();
    } else {
      window.alert("Animal precisa de um nome!");
    }
  }
}