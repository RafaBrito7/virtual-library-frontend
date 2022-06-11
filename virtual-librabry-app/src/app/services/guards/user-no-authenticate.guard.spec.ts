import { TestBed } from '@angular/core/testing';

import { UserNoAuthenticateGuard } from './user-no-authenticate.guard';

describe('UserNoAuthenticateGuard', () => {
  let guard: UserNoAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNoAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
