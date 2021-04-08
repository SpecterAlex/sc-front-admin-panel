import { TestBed } from '@angular/core/testing';

import { SetUpMesService } from './set-up-mes.service';

describe('SetUpMesService', () => {
  let service: SetUpMesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetUpMesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
