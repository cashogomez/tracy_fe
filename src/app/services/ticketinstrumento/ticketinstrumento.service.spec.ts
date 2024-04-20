import { TestBed } from '@angular/core/testing';

import { TicketinstrumentoService } from './ticketinstrumento.service';

describe('TicketinstrumentoService', () => {
  let service: TicketinstrumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketinstrumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
