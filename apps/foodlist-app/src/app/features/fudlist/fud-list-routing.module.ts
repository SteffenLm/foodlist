import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FudlistHomeComponent } from './components/fudlist-home/fudlist-home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const fudListRoutes: Routes = [
  {
    path: '',
    component: FudlistHomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'favourites' },
      { path: 'favourites', component: WelcomeComponent },
      {
        path: 'myfud',
        loadChildren: () =>
          import('./features/myfud/my-fud.module').then((m) => m.MyFudModule),
      },
      {
        path: 'mylist',
        loadChildren: () =>
          import('@foodlist/foodlist-app-shopping-list').then(
            (m) => m.FoodlistAppShoppingListModule
          ),
      },
      { path: '**', redirectTo: './' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fudListRoutes)],
  exports: [RouterModule],
})
export class FudListRoutingModule {}
