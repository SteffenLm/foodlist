import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ShoppingList } from '../../model/shopping-list.model';

@Component({
  selector: 'foodlist-shopping-lists-list',
  templateUrl: './shopping-lists-list.component.html',
  styleUrls: ['./shopping-lists-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [NgIf, MatListModule, NgFor],
})
export class ShoppingListsListComponent {
  @Input()
  public shoppingLists: ShoppingList[] = [];

  @Output()
  public listItemClick = new EventEmitter<ShoppingList>();

  public onShoppingListClicked(shoppingList: ShoppingList): void {
    this.listItemClick.next(shoppingList);
  }
}
