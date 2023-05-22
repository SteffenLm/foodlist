import { NonNullableFormBuilder, Validators } from '@angular/forms';
export type LoginFormValue = {
  username: string;
  password: string;
};

export const createLoginFormGroup = (formBuilder: NonNullableFormBuilder) =>
  formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        ),
      ],
    ],
  });
