import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFudHomeComponent } from './components/my-fud-home/my-fud-home.component';

const myFudRoutes: Routes = [
  {
    path: '',
    component: MyFudHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes',
      },
      {
        path: 'substances',
        loadChildren: () =>
          import('./features/substances/substances.module').then(
            (m) => m.SubstancesModule
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./features/recipes/recipes.module').then(
            (m) => m.RecipesModule
          ),
      },
      {
        path: '**',
        redirectTo: 'recipes',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(myFudRoutes)],
  exports: [RouterModule],
})
export class MyFudRoutingModule {}
