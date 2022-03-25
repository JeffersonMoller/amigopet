import { PadraoGuard } from './guards/padrao.guard';
import { CadastroAnimalComponent } from './cadastro-animal/cadastro-animal.component';
import { VisualizarAnimalComponent } from './visualizar-animal/visualizar-animal.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDicaComponent } from './add-dica/add-dica.component';
import { ListDicaComponent } from './list-dica/list-dica.component';
import { VerdicaComponent } from './verdica/verdica.component';
import { PetsComponent } from './pets/pets.component';
import { ListOngComponent } from './list-ong/list-ong.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { SobreComponent } from './sobre/sobre.component';
import { EditarDicaComponent } from './editar-dica/editar-dica.component';
import { CadastrarDicaComponent } from './cadastrar-dica/cadastrar-dica.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'novadica', component: AddDicaComponent, canActivate: [PadraoGuard]},
  { path: 'visualizar/:id', component: VisualizarAnimalComponent, canActivate: [PadraoGuard]},
  { path: 'pets/:id', component: PetsComponent, canActivate: [PadraoGuard]},
  { path: 'meuperfil', component: PerfilUsuarioComponent, canActivate: [PadraoGuard]},
  { path: 'cadastroAnimal', component: CadastroAnimalComponent, canActivate: [PadraoGuard]},
  { path: 'cadastrardica', component: CadastrarDicaComponent, canActivate: [PadraoGuard]},
  { path: 'editardica/:id', component: EditarDicaComponent, canActivate: [PadraoGuard]},
  { path: 'editarpet/:id', component: EditAnimalComponent, canActivate: [PadraoGuard]},
  { path: 'listdicas', component: ListDicaComponent},
  { path: 'cadastro', component: CadastroComponent, },
  { path: 'login', component: LoginComponent},
  { path: 'verdica/:id', component: VerdicaComponent},
  { path: 'listong', component: ListOngComponent},
  { path: 'home', component: HomeComponent},
  { path: 'sobre', component: SobreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
