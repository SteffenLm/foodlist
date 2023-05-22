import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStateService } from '@foodlist/foodlist-app/auth';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fudlist' },
  {
    path: 'login',
    loadChildren: () =>
      import('@foodlist/foodlist-app/login').then(
        (m) => m.FoodlistAppLoginModule
      ),
  },
  {
    path: 'fudlist',
    loadChildren: () =>
      import('./features/fudlist/fud-list.module').then((m) => m.FudListModule),
    canMatch: [() => inject(AuthStateService).isUserLoggedIn$],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
