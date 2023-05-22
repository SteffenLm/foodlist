import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loginFeature } from './login.feature';

@NgModule({
  imports: [StoreModule.forFeature(loginFeature)],
})
export class FoodlistAppLoginStateModule {}
