import { TestBed } from '@angular/core/testing';

import { LivreServiceService } from './livre-service.service';

describe('LivreServiceService', () => {
  let service: LivreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
