import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomShoppingListItem } from '../../models/custom-shopping-list-item.model';
import * as fromMyListActions from '../../state/my-list.actions';
import {
  selectClosedShoppingListItems,
  selectCurrentShoppingList,
  selectOpenShoppingListItems,
} from '../../state/my-list.selectors';

@Component({
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatFormFieldModule, MatListModule],
  selector: 'foodlist-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent {
  public shoppingList$ = this.store.select(selectCurrentShoppingList);
  public openItems$ = this.store.select(selectOpenShoppingListItems);
  public closedItems$ = this.store.select(selectClosedShoppingListItems);

  private listId = this.route.snapshot.paramMap.get('listid') as string;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
    this.shoppingList$ = this.store.select(selectCurrentShoppingList);
  }

  public addToList(name: string): void {
    const customItem = new CustomShoppingListItem(name, false);
    this.store.dispatch(
      fromMyListActions.addShoppingListItem({
        item: customItem,
        listId: this.listId.toString(),
      })
    );
    //    this.listService.addItemToList(customItem, this.listid);
  }

  public toggleItem(): void {
    // this.listService.toggleItemStatus(item, this.listid);
  }

  public onFinish(): void {
    // this.listService.removeDoneItems(this.listid);
  }
}
