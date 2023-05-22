import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthApiEffectActions } from '@foodlist/foodlist-app/auth';
import { provideMockActions } from '@ngrx/effects/testing';
import { firstValueFrom, Observable, of } from 'rxjs';

import { Action } from '@ngrx/store';
import { AppRoutingEffectActions, RoutingEffects } from './routing.effects';

describe('RoutingEffects', () => {
  let actions$: Observable<Action>;
  let effects: RoutingEffects;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        RoutingEffects,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: {
            navigate: navigateMock,
          },
        },
      ],
    });

    effects = TestBed.inject(RoutingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when a user has logged in successfully', () => {
    beforeEach(() => {
      actions$ = of(AuthApiEffectActions.loginSuccess({ token: 'test_token' }));
      navigateMock.mockResolvedValue(true);
    });

    it('should trigger a navigation to the start page', async () => {
      await firstValueFrom(effects.navigateToStartPage$);
      expect(navigateMock).toHaveBeenCalledWith(['fudlist']);
    });

    describe('when the navigation succedded', () => {
      beforeEach(() => {
        navigateMock.mockResolvedValue(true);
      });
      it('should dispatch the success action', async () => {
        const resultAction = await firstValueFrom(effects.navigateToStartPage$);
        expect(resultAction).toEqual(
          AppRoutingEffectActions.navigationToStartPageSucceeded()
        );
      });
    });

    describe('when the navigation failed', () => {
      beforeEach(() => {
        navigateMock.mockResolvedValue(false);
      });
      it('should dispatch the success action', async () => {
        const resultAction = await firstValueFrom(effects.navigateToStartPage$);
        expect(resultAction).toEqual(
          AppRoutingEffectActions.navigationToStartPageFailed()
        );
      });
    });
  });
});
