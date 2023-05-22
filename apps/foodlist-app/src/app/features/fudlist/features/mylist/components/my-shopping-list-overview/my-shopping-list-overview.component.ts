import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { Store } from '@ngrx/store';
import { MyListDialogService } from '../../services/my-list-dialog.service';
import { selectShoppingLists } from '../../state/my-list.selectors';

@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    FabButtonComponent,
    RouterLink,
  ],
  selector: 'foodlist-my-shopping-list-overview',
  templateUrl: './my-shopping-list-overview.component.html',
  styleUrls: ['./my-shopping-list-overview.component.scss'],
})
export class MyShoppingListOverviewComponent {
  public shoppingLists$ = this.store.select(selectShoppingLists);

  constructor(
    private readonly store: Store,
    private readonly myListDialogService: MyListDialogService
  ) {}

  onAddShoppingList() {
    this.myListDialogService.openCreateShoppingListDialog();
  }
}
