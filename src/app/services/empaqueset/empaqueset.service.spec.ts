import { TestBed } from '@angular/core/testing';

import { EmpaquesetService } from './empaqueset.service';

describe('EmpaquesetService', () => {
  let service: EmpaquesetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpaquesetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
