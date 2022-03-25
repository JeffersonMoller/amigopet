import { TestBed } from '@angular/core/testing';

import { PadraoGuard } from './padrao.guard';

describe('PadraoGuard', () => {
  let guard: PadraoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PadraoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
