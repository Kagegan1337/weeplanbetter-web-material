import { TestBed } from '@angular/core/testing';

import { FlagserviceService } from './flagservice.service';

describe('FlagserviceService', () => {
  let service: FlagserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
