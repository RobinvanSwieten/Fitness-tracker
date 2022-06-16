import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';
import {WorkoutComponent} from "./workout/workout.component";
import {ExerciselistComponent} from "./workout/exerciselist/exerciselist.component";
import {HttpClientModule} from "@angular/common/http";
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule

  ],
  declarations: [WorkoutsPage, WorkoutComponent, ExerciselistComponent]
})
export class WorkoutsPageModule {}
