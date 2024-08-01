import { TestBed } from '@angular/core/testing';

import { BreakpointResolverService } from './breakpoint-resolver.service';

describe('BreakpointResolverService', () => {
  let service: BreakpointResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
