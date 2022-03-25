import { TokenServiceService } from './../services/token-service.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Usuario } from './../beans/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {};
  islogged = false;

  constructor(
    private servico: AuthService,
    private router: Router,
    private tokenServico: TokenServiceService
  ) { }

  ngOnInit(): void { }

  salvar(): void {
    this.servico.login(this.usuario).subscribe(
      (data) => {
        this.tokenServico.setToken(data.token);
        this.router.navigate(['home']).then(() => {
          location.reload();
        });
      },
      (erro) => {
        window.alert("Login/Senha Incorreto!");
      }
    );
  }
}
