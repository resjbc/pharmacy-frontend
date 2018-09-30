import { TestBed, inject } from '@angular/core/testing';

import { AddlistService } from './addlist.service';

describe('AddlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddlistService]
    });
  });

  it('should be created', inject([AddlistService], (service: AddlistService) => {
    expect(service).toBeTruthy();
  }));
});
