import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workouts',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/logs/logs.module').then( m => m.LogsPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/workouts/workouts.module').then( m => m.WorkoutsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
