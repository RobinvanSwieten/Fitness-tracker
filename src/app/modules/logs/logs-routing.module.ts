import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsPage } from './logs.page';
import { TabsPage } from "../../layout/tabs/tabs.page";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'logs',
        component: LogsPage
      },
      {
        path: 'logs/workout/:id',
        loadChildren: () => import('./workout/workout.module').then( m => m.WorkoutPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsPageRoutingModule {}
