import { TestBed } from '@angular/core/testing';

import { CantidadinstrumentoService } from './cantidadinstrumento.service';

describe('CantidadinstrumentoService', () => {
  let service: CantidadinstrumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantidadinstrumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
