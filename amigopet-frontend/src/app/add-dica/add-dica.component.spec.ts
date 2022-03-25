import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDicaComponent } from './add-dica.component';

describe('AddDicaComponent', () => {
  let component: AddDicaComponent;
  let fixture: ComponentFixture<AddDicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
