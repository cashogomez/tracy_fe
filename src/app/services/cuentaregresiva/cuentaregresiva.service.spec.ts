import { TestBed } from '@angular/core/testing';

import { CuentaregresivaService } from './cuentaregresiva.service';

describe('CuentaregresivaService', () => {
  let service: CuentaregresivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaregresivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
