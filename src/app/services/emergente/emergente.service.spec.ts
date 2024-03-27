import { TestBed } from '@angular/core/testing';

import { EmergenteService } from './emergente.service';

describe('EmergenteService', () => {
  let service: EmergenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
