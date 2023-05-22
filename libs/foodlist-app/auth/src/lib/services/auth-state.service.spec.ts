import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { AuthenticationFeature } from '../+state/auth.feature';
import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  let service: AuthStateService;
  let mockStore: MockStore;
  let isTokenExpiredMock: jest.Mock;

  beforeEach(() => {
    isTokenExpiredMock = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: JwtHelperService,
          useValue: { isTokenExpired: isTokenExpiredMock },
        },
      ],
    });
    service = TestBed.inject(AuthStateService);
    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when there is no token in the store', () => {
    beforeEach(() => {
      mockStore.overrideSelector(AuthenticationFeature.selectToken, null);
    });

    it('should return false', async () => {
      const result = firstValueFrom(service.isUserLoggedIn$);
      await expect(result).resolves.toEqual(false);
    });
  });

  describe('when there is an expired token in the store', () => {
    beforeEach(() => {
      isTokenExpiredMock.mockReturnValue(true);
      mockStore.overrideSelector(AuthenticationFeature.selectToken, 'token');
    });

    it('should return false', async () => {
      const result = firstValueFrom(service.isUserLoggedIn$);
      await expect(result).resolves.toEqual(false);
    });
  });

  describe('when there is an valid token in the store', () => {
    beforeEach(() => {
      isTokenExpiredMock.mockReturnValue(false);
      mockStore.overrideSelector(AuthenticationFeature.selectToken, 'token');
    });

    it('should return true', async () => {
      const result = firstValueFrom(service.isUserLoggedIn$);
      await expect(result).resolves.toEqual(true);
    });
  });
});
