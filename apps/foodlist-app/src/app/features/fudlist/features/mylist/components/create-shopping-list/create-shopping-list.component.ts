import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';

@Component({
  selector: 'foodlist-create-shopping-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingSpinnerButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-shopping-list.component.html',
  styleUrls: ['./create-shopping-list.component.scss'],
})
export class CreateShoppingListComponent {
  @Input()
  public showLoadingSpinner = false;

  @Output()
  public created = new EventEmitter<string>();

  @Output()
  public closed = new EventEmitter<void>();

  public createShoppingListFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.createShoppingListFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  public onSubmit(): void {
    this.created.emit(this.createShoppingListFormGroup.controls['name'].value);
  }

  public onClose(): void {
    this.closed.emit();
  }
}
