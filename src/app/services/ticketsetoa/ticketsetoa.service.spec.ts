import { TestBed } from '@angular/core/testing';

import { TicketsetOAService } from './ticketsetoa.service';

describe('TicketsetoaService', () => {
  let service: TicketsetOAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsetOAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
