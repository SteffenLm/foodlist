import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNavListHarness } from '@angular/material/list/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  selectIsLoading,
  selectLists,
} from '../../+state/shopping-lists.selectors';
import { AngularMaterialModule } from '../../angular-material.module';
import {
  exampleShoppingList,
  exampleShoppingLists,
} from '../../model/shopping-list.model';
import { ShoppingListsListComponent } from '../shopping-lists-list/shopping-lists-list.component';
import * as ShoppingListPageActions from './shopping-list-page.actions';
import { ShoppingListPageComponent } from './shopping-list-page.component';

describe('ShoppingListPageComponent', () => {
  let component: ShoppingListPageComponent;
  let fixture: ComponentFixture<ShoppingListPageComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        ShoppingListPageComponent,
        ShoppingListsListComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIsLoading, value: true },
            { selector: selectLists, value: [...exampleShoppingLists()] },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject<MockStore>(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the shopping lists are loading', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should display the progress bar', async () => {
      const progressBar = loader.getHarness(MatProgressBarHarness);
      await expect(progressBar).resolves.toBeDefined();
    });

    it('should display the progress bar in indeterminate mode', async () => {
      const progressBar = await loader.getHarness(MatProgressBarHarness);
      const progressBarMode = await progressBar.getMode();
      expect(progressBarMode).toEqual('indeterminate');
    });
  });

  describe('when the shopping lists are not loading', () => {
    beforeEach(() => {
      store.overrideSelector(selectIsLoading, false);
      store.refreshState();
      fixture.detectChanges();
    });
    it('should not display the progress bar', async () => {
      const progressBar = loader.getHarness(MatProgressBarHarness);
      await expect(progressBar).rejects.toThrow();
    });
  });

  describe('when there are no shopping lists', () => {
    beforeEach(() => {
      store.overrideSelector(selectLists, []);
      store.refreshState();
      fixture.detectChanges();
    });
    it('should not display any shopping lists', async () => {
      const list = loader.getHarness(MatNavListHarness);
      await expect(list).rejects.toThrow();
    });
  });

  describe('when there is one shopping list', () => {
    beforeEach(() => {
      store.resetSelectors();
      store.refreshState();
      fixture.detectChanges();
    });

    it('should display the list', async () => {
      const list = loader.getHarness(MatNavListHarness);
      await expect(list).resolves.toBeDefined();
    });

    it('should display one list item', async () => {
      const list = await loader.getHarness(MatNavListHarness);
      const items = await list.getItems();
      expect(items.length).toEqual(1);
    });

    describe('when a shopping list is clicked', () => {
      let dispatchSpy: jest.SpyInstance;

      beforeEach(async () => {
        dispatchSpy = jest.spyOn(store, 'dispatch');
        const list = await loader.getHarness(MatNavListHarness);
        const items = await list.getItems();
        const [firstItem] = items;
        firstItem.click();
      });

      it('should dispatch a list item clicked action', () => {
        const expectedAction = ShoppingListPageActions.clickedOnShoppingList({
          newShoppingList: exampleShoppingList(),
        });
        expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
