import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../beans/Cidade';
import { Estado } from '../beans/Estado';
import { Usuario } from '../beans/Usuario';
import { EstadoService } from '../services/estado.service';
import { TokenServiceService } from '../services/token-service.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private estadoServico: EstadoService, private tokenService: TokenServiceService, private usuarioServico: UsuarioService) {

  }

  estados: Observable<Estado[]> = new Observable();
  cidades: Observable<Cidade[]> = new Observable();
  idEstadoSelecionado: string = '0';
  usuario: Usuario = {};
  user?: Observable<Usuario>;

  ngOnInit(): void {
    this.buscar();
    this.getAuth();
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

  alterarUsuario() {
    if ( this.usuario.senha != null){
    this.usuarioServico.alterar(this.usuario);
    } else {
      window.alert("A senha não pode ser vazia");
    }
  }

  getAuth() {
    this.user = this.tokenService.getUser();
    this.user.subscribe((resolve) => {
      this.usuario.id = resolve.id;
      this.usuario.nome = resolve.nome;
      this.usuario.email = resolve.email;
      this.usuario.celular = resolve.celular;
      this.usuario.senha = resolve.senha;
    }
    );
  }
}
