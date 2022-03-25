import { Component, OnInit } from '@angular/core';
import { Dica } from '../beans/Dica';
import { Usuario } from '../beans/Usuario';
import { DicaService } from '../services/dica.service';
import { TokenServiceService } from '../services/token-service.service';

@Component({
  selector: 'app-cadastrar-dica',
  templateUrl: './cadastrar-dica.component.html',
  styleUrls: ['./cadastrar-dica.component.scss']
})
export class CadastrarDicaComponent implements OnInit {

  dica: Dica = {}
  usuario:Usuario = {};

  constructor(private servico:DicaService, private userServico:TokenServiceService) { }

  ngOnInit(): void {
    this.userServico.getUser().subscribe(
      (resolve) => {
        this.usuario.id = resolve.id;
        this.usuario.nome = resolve.id;
        this.usuario.email = resolve.id;
        this.usuario.celular = resolve.id;
      }
    );
  }

  cadastrar(){
    this.dica.usuario = this.usuario;
    this.servico.cadastrarDica(this.dica).subscribe(
      (dica:Dica) => window.alert("Dica " + dica.titulo + " Cadastrada com sucesso!")
    );
    this.dica = new Dica;
  }
}
