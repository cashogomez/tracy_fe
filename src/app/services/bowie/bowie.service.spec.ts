import { TestBed } from '@angular/core/testing';

import { BowieService } from './bowie.service';

describe('BowieService', () => {
  let service: BowieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
