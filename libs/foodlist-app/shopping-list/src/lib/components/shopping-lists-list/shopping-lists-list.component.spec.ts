import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNavListItemHarness } from '@angular/material/list/testing';
import { firstValueFrom } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material.module';
import { ShoppingListsListComponent } from './shopping-lists-list.component';
describe('ShoppingListsListComponent', () => {
  let component: ShoppingListsListComponent;
  let fixture: ComponentFixture<ShoppingListsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterialModule, ShoppingListsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there are not shopping lists in the component', () => {
    it('should not contain an mat nav list item', async () => {
      component.shoppingLists = [];

      fixture.detectChanges();

      const getHarnessPromise = loader.getHarness(MatNavListItemHarness);
      await expect(getHarnessPromise).rejects.toThrowError();
    });
  });

  describe('when there is one shopping list in the component', () => {
    beforeEach(() => {
      component.shoppingLists = [{ id: '1', name: 'Lidl' }];
      fixture.changeDetectorRef.detectChanges();
    });

    it('should contain a list element with the name of the list', async () => {
      const matNavListItem = await loader.getHarness(MatNavListItemHarness);
      const text = await matNavListItem.getFullText();
      expect(text.startsWith('Lidl')).toEqual(true);
    });

    describe('when the user clicks on the list item', () => {
      it('should emit the clicked shoppinglist', async () => {
        const listItem = await loader.getHarness(MatNavListItemHarness);
        const clickedShoppingList = component.shoppingLists[0];

        listItem.click();

        const emittedShoppingList = firstValueFrom(component.listItemClick);
        await expect(emittedShoppingList).resolves.toBe(clickedShoppingList);
      });
    });
  });
});
