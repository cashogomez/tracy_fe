import { TestBed } from '@angular/core/testing';

import { AreatrabajoService } from './areatrabajo.service';

describe('AreatrabajoService', () => {
  let service: AreatrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreatrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
