import { TestBed, inject } from '@angular/core/testing';

import { SharedsService } from './shareds.service';

describe('SharedsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedsService]
    });
  });

  it('should be created', inject([SharedsService], (service: SharedsService) => {
    expect(service).toBeTruthy();
  }));
});
