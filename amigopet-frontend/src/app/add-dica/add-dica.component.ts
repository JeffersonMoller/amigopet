import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dica } from '../beans/Dica';
import { Usuario } from '../beans/Usuario';
import { DicaService } from '../services/dica.service';
import { TokenServiceService } from '../services/token-service.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-add-dica',
  templateUrl: './add-dica.component.html',
  styleUrls: ['./add-dica.component.scss']
})
export class AddDicaComponent implements OnInit {

  constructor(private dicaServico: DicaService, private usuarioServico: TokenServiceService) { }

  dicas: Observable<Dica[]> = new Observable();
  user?: Observable<Usuario>;
  idUsuer:string = "0";
  ngOnInit(): void {
    this.usuarioServico.getUser().subscribe(
      (resolve) => {
        this.idUsuer = resolve.id;
        this.getDicasByIdUser();
      }
    );
  }

  getDicasByIdUser() {
   this.dicas = this.dicaServico.getDicasByIdUsers(this.idUsuer);
    this.dicas.subscribe(
      resp => console.log(resp)
    )
  }

  excluirDica(id?:number){
    this.dicaServico.excluirDica(id).subscribe(
      resolve => {
        window.alert("Dica excluida com suesso!")
      }
    );
  }

}
