import { VisualizarAnimalComponent } from './../visualizar-animal/visualizar-animal.component';
import { Animal } from './../beans/Animal';
import { AnimalService } from './../services/animal.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  animais: Observable<Animal[]> = new Observable();
  id?: any = null;

  constructor(private animalServico: AnimalService) {}

  ngOnInit(): void {
    this.getAllAnimais();
  }

  getAllAnimais() {
    this.animalServico.listarAnimais().subscribe((resolve) => {
      this.animalServico.setAnimais(resolve);
      this.animais = this.animalServico.getAnimais();
    });
  }
}
