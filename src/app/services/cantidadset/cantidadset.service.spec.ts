import { TestBed } from '@angular/core/testing';

import { CantidadsetService } from './cantidadset.service';

describe('CantidadsetService', () => {
  let service: CantidadsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantidadsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
