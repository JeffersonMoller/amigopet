import { DicaService } from './../services/dica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dica } from '../beans/Dica';

@Component({
  selector: 'app-verdica',
  templateUrl: './verdica.component.html',
  styleUrls: ['./verdica.component.scss']
})
export class VerdicaComponent implements OnInit {

  dica: Dica = {};

  constructor(private servico:DicaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDicaById(this.route.snapshot.paramMap.get('id'));
  }

  getDicaById(id:any) {
    this.servico.getDicaById(id)
    .subscribe(
      date => {
        this.dica = date;
      }
    );
  }

}
