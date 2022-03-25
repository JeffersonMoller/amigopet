import { UsuarioService } from './../services/usuario.service';
import { Usuario } from './../beans/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = {};
  constructor(private servico: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  cadastrar() {
    if (this.usuario.email == null || this.usuario.nome == null || this.usuario.celular == null || this.usuario.senha == null) {
      window.alert("Nenhum campo pode estar vazio!");
    } else {
      this.servico.cadastrarUsuario(this.usuario).subscribe(
        resolve => {
          window.alert("Usuario " + this.usuario.nome + " Cadastrado com sucesso!")
          this.usuario = new Usuario;
        }, error => {
          window.alert("Email já cadastrado em nosso sistema!");
        }
      );
    }
  }





}
