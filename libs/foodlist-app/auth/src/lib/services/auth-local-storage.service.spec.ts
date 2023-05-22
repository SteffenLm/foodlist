import { TestBed } from '@angular/core/testing';
import {
  LOCAL_STORAGE,
  LOCAL_STORAGE_KEY,
} from '@foodlist/foodlist-app/storage';
import { AuthLocalStorageService } from './auth-local-storage.service';

describe('AuthStateService', () => {
  let service: AuthLocalStorageService;
  let getItemMock: jest.Mock;
  let setItemMock: jest.Mock;

  beforeEach(() => {
    getItemMock = jest.fn().mockReturnValue(null);
    setItemMock = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOCAL_STORAGE,
          useValue: { getItem: getItemMock, setItem: setItemMock },
        },
        {
          provide: LOCAL_STORAGE_KEY,
          useValue: 'token',
        },
      ],
    });
    service = TestBed.inject(AuthLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveToken', () => {
    let token: string;
    beforeEach(() => {
      token = 'testToken';
      service.saveToken(token);
    });

    it('should save the token in an array', () => {
      expect(setItemMock).toHaveBeenCalledWith(
        'token',
        JSON.stringify([token])
      );
    });
  });
});
