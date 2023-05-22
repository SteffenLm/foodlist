import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import { exampleShoppingListsDTO } from '../model/shopping-list-dto-model';
import { exampleShoppingLists } from '../model/shopping-list.model';
import { ShoppingListHttpService } from '../services/shopping-list-http.service';
import * as ShoppingListPageActions from './../components/shopping-list-page/shopping-list-page.actions';
import * as ShoppingListActions from './shopping-lists.actions';
import { ShoppingListsEffects } from './shopping-lists.effects';

describe('ShoppingListsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ShoppingListsEffects;
  let shoppingListHttpService: ShoppingListHttpService;

  beforeEach(() => {
    const shoppingListHttpServiceMock: Partial<ShoppingListHttpService> = {
      getAllShoppingLists: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ShoppingListsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: ShoppingListHttpService,
          useValue: shoppingListHttpServiceMock,
        },
      ],
    });

    effects = TestBed.inject(ShoppingListsEffects);
    shoppingListHttpService = TestBed.inject(ShoppingListHttpService);
  });

  describe('when user has entered the shopping list page', () => {
    let getAllShoppingListsSpy: jest.SpyInstance;

    beforeEach(() => {
      actions$ = of(ShoppingListPageActions.enteredShoppingListPage());
      getAllShoppingListsSpy = jest.spyOn(
        shoppingListHttpService,
        'getAllShoppingLists'
      );
    });
    describe('when the http request was successful', () => {
      beforeEach(() => {
        getAllShoppingListsSpy.mockReturnValue(of(exampleShoppingListsDTO()));
      });
      it('should return an action that all shopping lists has been loaded successfully', (done) => {
        effects.getShoppingLists$.subscribe((action) => {
          expect(action).toEqual(
            ShoppingListActions.getAllShoppingListsSuccess({
              shoppingLists: exampleShoppingLists(),
            })
          );
          done();
        });
      });
      it('should call the http service one time', (done) => {
        effects.getShoppingLists$.subscribe(() => {
          expect(getAllShoppingListsSpy).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });

    describe('when the http request has failed', () => {
      beforeEach(() => {
        getAllShoppingListsSpy.mockReturnValue(
          throwError(() => new Error('unknown error'))
        );
      });
      it('should return an action that all shopping lists has not been loaded successfully', (done) => {
        effects.getShoppingLists$.subscribe((action) => {
          expect(action).toEqual(
            ShoppingListActions.getAllShoppingListsFailure()
          );
          done();
        });
      });
      it('should call the http service one time', (done) => {
        effects.getShoppingLists$.subscribe(() => {
          expect(getAllShoppingListsSpy).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });
  });
});
