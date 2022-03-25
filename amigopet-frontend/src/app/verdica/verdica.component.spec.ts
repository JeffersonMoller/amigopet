import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdicaComponent } from './verdica.component';

describe('VerdicaComponent', () => {
  let component: VerdicaComponent;
  let fixture: ComponentFixture<VerdicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
