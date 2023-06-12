import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  const USER_KEY = 'auth-user';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });
  it('should save and retrieve user from sessionStorage', () => {
    const user = { token: '57620787-c290-4e09-8bc9-2c8a6f3d3e27' };
    storageService.saveUser(USER_KEY, user);
    const retrievedUser = storageService.getUser();
    expect(retrievedUser).toEqual(user);
  });


  it('should return true if user is logged in', () => {
    const user = { token: '57620787-c290-4e09-8bc9-2c8a6f3d3e27' };
    storageService.saveUser(USER_KEY, user);
    const isLoggedIn$ = storageService.isLoggedIn();
    let isLoggedIn: boolean | undefined;
    isLoggedIn$.subscribe(value => {
      isLoggedIn = value;
    });
    expect(isLoggedIn).toBeTrue();
  });

  it('should return false if user is not logged in', () => {
    window.sessionStorage.removeItem(USER_KEY);
    const isLoggedIn$ = storageService.isLoggedIn();
    let isLoggedIn: boolean | undefined;
    isLoggedIn$.subscribe(value => {
      isLoggedIn = value;
    });
    expect(isLoggedIn).toBeFalse();
  });

});
