import { Observable } from 'rxjs';
import { AnimalService } from './../services/animal.service';
import { Animal } from './../beans/Animal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-animal',
  templateUrl: './visualizar-animal.component.html',
  styleUrls: ['./visualizar-animal.component.scss'],
})
export class VisualizarAnimalComponent implements OnInit {
  animal: Animal = {};
  wpp?: string;

  celularUsuario?:string;
  nomeUsuario?:string;
  constructor(private servico: AnimalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.criaLinkWhatsapp();
    this.getAnimalById(this.route.snapshot.paramMap.get('id'));
  }

  criaLinkWhatsapp() {
    //   this.wpp =
  }

  getAnimalById(id: any) {
    this.servico.getAnimalById(id)
    .subscribe(
      (data:any) => {
        this.animal = data;
        this.celularUsuario = data.celularUsuario;
        this.nomeUsuario = data.nomeUsuario;
      }
    );
  }
}
