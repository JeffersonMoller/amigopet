import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDicaComponent } from './cadastrar-dica.component';

describe('CadastrarDicaComponent', () => {
  let component: CadastrarDicaComponent;
  let fixture: ComponentFixture<CadastrarDicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarDicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarDicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
