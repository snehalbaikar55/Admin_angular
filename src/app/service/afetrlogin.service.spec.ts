import { TestBed } from '@angular/core/testing';

import { AfetrloginService } from './afetrlogin.service';

describe('AfetrloginService', () => {
  let service: AfetrloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfetrloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
