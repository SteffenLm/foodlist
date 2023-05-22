import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsLoading,
  selectLists,
} from '../../+state/shopping-lists.selectors';
import { ShoppingList } from '../../model/shopping-list.model';
import { ShoppingListsListComponent } from '../shopping-lists-list/shopping-lists-list.component';
import * as ShoppingListPageActions from './shopping-list-page.actions';

@Component({
  selector: 'foodlist-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.scss'],
  standalone: true,
  imports: [NgIf, MatProgressBarModule, ShoppingListsListComponent, AsyncPipe],
})
export class ShoppingListPageComponent implements OnInit {
  shoppingLists$: Observable<ShoppingList[]>;
  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.shoppingLists$ = this.store.select(selectLists);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  public ngOnInit(): void {
    this.store.dispatch(ShoppingListPageActions.enteredShoppingListPage());
  }

  public onShoppingListClicked(clickedShoppingList: ShoppingList): void {
    this.store.dispatch(
      ShoppingListPageActions.clickedOnShoppingList({
        newShoppingList: clickedShoppingList,
      })
    );
  }
}
