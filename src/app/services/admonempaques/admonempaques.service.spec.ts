import { TestBed } from '@angular/core/testing';

import { AdmonempaquesService } from './admonempaques.service';

describe('AdmonempaquesService', () => {
  let service: AdmonempaquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmonempaquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
