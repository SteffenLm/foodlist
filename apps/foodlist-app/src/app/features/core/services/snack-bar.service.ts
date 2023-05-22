import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  public openDeleteSnackBar(): MatSnackBarRef<TextOnlySnackBar> {
    const message = 'Erfolgreich gelöscht';
    const action = 'Rückgängig machen';
    const snackBarRef = this.matSnackBar.open(message, action);
    return snackBarRef;
  }
}
