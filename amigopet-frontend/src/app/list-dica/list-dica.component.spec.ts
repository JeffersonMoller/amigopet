import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDicaComponent } from './list-dica.component';

describe('ListDicaComponent', () => {
  let component: ListDicaComponent;
  let fixture: ComponentFixture<ListDicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
