import { LayoutComponent } from './shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    /// @TODO: remove this
    pathMatch: 'full',
    redirectTo: 'cars',
    /////

    // loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
  },
  {
    path: 'cars',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
    }]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
