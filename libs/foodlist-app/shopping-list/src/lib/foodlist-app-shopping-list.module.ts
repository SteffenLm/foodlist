import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShoppingListsEffects } from './+state/shopping-lists.effects';
import * as fromShoppingLists from './+state/shopping-lists.reducer';
import { AngularMaterialModule } from './angular-material.module';
import { ShoppingListPageComponent } from './components/shopping-list-page/shopping-list-page.component';
import { ShoppingListsListComponent } from './components/shopping-lists-list/shopping-lists-list.component';
@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ShoppingListPageComponent,
      },
    ]),
    StoreModule.forFeature(
      fromShoppingLists.SHOPPING_LISTS_FEATURE_KEY,
      fromShoppingLists.shoppingListsReducer
    ),
    EffectsModule.forFeature([ShoppingListsEffects]),
    ShoppingListsListComponent,
    ShoppingListPageComponent,
  ],
})
export class FoodlistAppShoppingListModule {}
