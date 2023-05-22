import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { MyShoppingListOverviewComponent } from './components/my-shopping-list-overview/my-shopping-list-overview.component';

const myListRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyShoppingListOverviewComponent,
  },
  {
    path: ':listid',
    component: ListDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(myListRoutes)],
  exports: [RouterModule],
})
export class MyListRoutingModule {}
