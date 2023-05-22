import { NgModule } from '@angular/core';
import { FoodlistAppLoginStateModule } from './+state/foodlist-app-login-state.module';
import { FoodlistAppLoginRoutingModule } from './foodlist-app-login-routing.module';

@NgModule({
  imports: [FoodlistAppLoginRoutingModule, FoodlistAppLoginStateModule],
})
export class FoodlistAppLoginModule {}
