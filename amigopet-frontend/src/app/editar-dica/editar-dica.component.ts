import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dica } from '../beans/Dica';
import { DicaService } from '../services/dica.service';

@Component({
  selector: 'app-editar-dica',
  templateUrl: './editar-dica.component.html',
  styleUrls: ['./editar-dica.component.scss']
})
export class EditarDicaComponent implements OnInit {

  dica:Dica = {};

  constructor(private servicoDica:DicaService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getDicaById(this.route.snapshot.paramMap.get('id'));
  }

  getDicaById(id:any){
    this.servicoDica.getDicaById(id).subscribe(
      (resolve:any) => {
        this.dica.id = resolve.id;
        this.dica.titulo = resolve.titulo;
        this.dica.descricao = resolve.descricao;
      }
    );
  }

  alterarDica(){
    this.servicoDica.alterarDica(this.dica).subscribe(
      resolve => window.alert("Dica alterada!")
    );
  }

}
