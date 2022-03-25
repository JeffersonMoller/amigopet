import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { EstadoService } from './services/estado.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FiltroComponent } from './filtro/filtro.component';
import { AddDicaComponent } from './add-dica/add-dica.component';
import { ListDicaComponent } from './list-dica/list-dica.component';
import { PetsComponent } from './pets/pets.component';
import { VerdicaComponent } from './verdica/verdica.component';
import { VisualizarAnimalComponent } from './visualizar-animal/visualizar-animal.component';
import { ListOngComponent } from './list-ong/list-ong.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { SobreComponent } from './sobre/sobre.component';
import { CadastroAnimalComponent } from './cadastro-animal/cadastro-animal.component';
import { EditarDicaComponent } from './editar-dica/editar-dica.component';
import { CadastrarDicaComponent } from './cadastrar-dica/cadastrar-dica.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    FiltroComponent,
    AddDicaComponent,
    ListDicaComponent,
    PetsComponent,
    VerdicaComponent,
    VisualizarAnimalComponent,
    ListOngComponent,
    PerfilUsuarioComponent,
    SobreComponent,
    CadastroAnimalComponent,
    CadastrarDicaComponent,
    EditarDicaComponent,
    EditAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig) 
  ],
  providers: [EstadoService],
  bootstrap: [AppComponent]
})

export class AppModule { }
