import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDicaComponent } from './editar-dica.component';

describe('EditarDicaComponent', () => {
  let component: EditarDicaComponent;
  let fixture: ComponentFixture<EditarDicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
