import { TestBed } from '@angular/core/testing';

import { MaterialesterilizadorService } from './materialesterilizador.service';

describe('MaterialesterilizadorService', () => {
  let service: MaterialesterilizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesterilizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
