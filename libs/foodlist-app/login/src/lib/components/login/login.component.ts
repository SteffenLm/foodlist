import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { loginFeature } from '../../+state/login.feature';
import { LoginComponentActions } from './login.actions';
import { createLoginFormGroup } from './login.form';

@Component({
  selector: 'foodlist-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
  ],
  standalone: true,
})
export class LoginComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public readonly loginForm = createLoginFormGroup(this.formBuilder);
  public readonly errorMessage = this.store.select(loginFeature.selectError);

  onRegisterClicked() {
    this.store.dispatch(LoginComponentActions.registerClicked());
  }

  onSubmit(): void {
    const formValue = this.loginForm.getRawValue();
    this.store.dispatch(LoginComponentActions.submitClicked(formValue));
  }
}
