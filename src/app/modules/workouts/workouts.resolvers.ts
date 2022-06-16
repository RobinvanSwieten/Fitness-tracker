import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { WorkoutService } from "../../core/workout.service";

@Injectable({
    providedIn: 'root'
})

export class WorkoutsResolvers implements Resolve<any>
{
  constructor(
    private _workoutservice: WorkoutService,
  ) {}

  async resolve()
  {
    await this._workoutservice.getActiveProgram();
    await this._workoutservice.getLogs();
    return await this._workoutservice.getWorkouts();

  }

}
