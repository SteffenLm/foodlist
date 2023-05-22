import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateShoppingListDialogComponent } from '../components/create-shopping-list-dialog/create-shopping-list-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class MyListDialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public openCreateShoppingListDialog(): void {
    this.matDialog.open<CreateShoppingListDialogComponent>(
      CreateShoppingListDialogComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
      }
    );
  }
}
