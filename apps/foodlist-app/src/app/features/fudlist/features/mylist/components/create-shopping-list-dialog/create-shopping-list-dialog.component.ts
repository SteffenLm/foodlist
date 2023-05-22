import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateShoppingListComponent } from '../create-shopping-list/create-shopping-list.component';

@Component({
  selector: 'foodlist-create-shopping-list-dialog',
  templateUrl: './create-shopping-list-dialog.component.html',
  styleUrls: ['./create-shopping-list-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CreateShoppingListComponent],
})
export class CreateShoppingListDialogComponent {
  public loading = false;

  constructor(
    private readonly matDialogRef: MatDialogRef<CreateShoppingListDialogComponent>
  ) {}

  public onCreated(): void {
    this.loading = true;
  }

  public onClose(): void {
    this.matDialogRef.close();
  }
}
