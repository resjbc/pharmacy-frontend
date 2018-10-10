import { TestBed } from '@angular/core/testing';

import { ActTypeListService } from './act-type-list.service';

describe('ActTypeListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActTypeListService = TestBed.get(ActTypeListService);
    expect(service).toBeTruthy();
  });
});
