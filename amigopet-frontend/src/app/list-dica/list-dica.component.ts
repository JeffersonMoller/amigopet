import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dica } from '../beans/Dica';
import { DicaService } from '../services/dica.service';

@Component({
  selector: 'app-list-dica',
  templateUrl: './list-dica.component.html',
  styleUrls: ['./list-dica.component.scss']
})
export class ListDicaComponent implements OnInit {

  dicas: Observable<Dica[]> = new Observable();

  constructor(private router: Router, private servico: DicaService) { }

  ngOnInit(): void {
  this.getDicas();
  }

  getDicas() {
    this.dicas = this.servico.getAllDicas();
    this.dicas.subscribe(
      resolve => console.log(resolve)
    );
  }

}
