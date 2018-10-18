import { TestBed } from '@angular/core/testing';

import { CustomHashLocationStrategyService } from './custom-hash-location-strategy.service';

describe('CustomHashLocationStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomHashLocationStrategyService = TestBed.get(CustomHashLocationStrategyService);
    expect(service).toBeTruthy();
  });
});
