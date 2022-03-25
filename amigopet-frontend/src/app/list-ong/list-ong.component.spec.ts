import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOngComponent } from './list-ong.component';

describe('ListOngComponent', () => {
  let component: ListOngComponent;
  let fixture: ComponentFixture<ListOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
