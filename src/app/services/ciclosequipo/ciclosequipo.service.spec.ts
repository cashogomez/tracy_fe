import { TestBed } from '@angular/core/testing';

import { CiclosequipoService } from './ciclosequipo.service';

describe('CiclosequipoService', () => {
  let service: CiclosequipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiclosequipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
