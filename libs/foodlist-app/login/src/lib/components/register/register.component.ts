import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'foodlist-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  standalone: true,
})
export class RegisterComponent {
  usernameFormGroup: UntypedFormGroup;
  passwordFormGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.usernameFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
