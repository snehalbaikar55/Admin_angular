import { TestBed } from '@angular/core/testing';

import { ManageusersService } from './manageusers.service';

describe('ManageusersService', () => {
  let service: ManageusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
