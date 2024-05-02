import { TestBed } from '@angular/core/testing';

import { ImprimirQRService } from './imprimir-qr.service';

describe('ImprimirQRService', () => {
  let service: ImprimirQRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprimirQRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
