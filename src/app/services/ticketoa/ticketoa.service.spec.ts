import { TestBed } from '@angular/core/testing';

import { TicketoaService } from './ticketoa.service';

describe('TicketoaService', () => {
  let service: TicketoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
