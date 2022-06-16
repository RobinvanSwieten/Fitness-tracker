import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsPage } from './workouts.page';
import { TabsPage } from "../../layout/tabs/tabs.page";
import { WorkoutsResolvers } from "./workouts.resolvers";


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'workouts',
        component: WorkoutsPage,
        resolve  : {
          routine: WorkoutsResolvers
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsPageRoutingModule {}
