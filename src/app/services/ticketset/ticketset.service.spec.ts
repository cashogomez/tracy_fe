import { TestBed } from '@angular/core/testing';

import { TicketsetService } from './ticketset.service';

describe('TicketsetService', () => {
  let service: TicketsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
