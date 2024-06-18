import { TestBed } from '@angular/core/testing';

import { EventoesterilizacionService } from './eventoesterilizacion.service';

describe('EventoesterilizacionService', () => {
  let service: EventoesterilizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoesterilizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
