import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import * as fromMyList from './state/my-list.reducer';

import { MyListRoutingModule } from './my-list.routing.module';

import { CreateShoppingListDialogComponent } from './components/create-shopping-list-dialog/create-shopping-list-dialog.component';
import { CreateShoppingListComponent } from './components/create-shopping-list/create-shopping-list.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { MyShoppingListOverviewComponent } from './components/my-shopping-list-overview/my-shopping-list-overview.component';
import { MyListDialogService } from './services/my-list-dialog.service';

@NgModule({
  imports: [
    MyShoppingListOverviewComponent,
    ListDetailsComponent,
    CreateShoppingListDialogComponent,
    CreateShoppingListComponent,
    MyListRoutingModule,
    StoreModule.forFeature(fromMyList.featureKey, fromMyList.reducer),
  ],
  providers: [MyListDialogService],
})
export class MyListModule {}
