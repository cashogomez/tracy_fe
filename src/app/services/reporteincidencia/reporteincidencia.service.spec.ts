import { TestBed } from '@angular/core/testing';

import { ReporteincidenciaService } from './reporteincidencia.service';

describe('ReporteincidenciaService', () => {
  let service: ReporteincidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteincidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
