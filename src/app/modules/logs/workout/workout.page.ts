import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {workout} from "../../../core/workout.types";
import {WorkoutService} from "../../../core/workout.service";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {

  indexplan;
  public workout: workout = {}
  constructor(
    private _route: ActivatedRoute,
    private _navCtrl: NavController,
    private _changeDetectorRef: ChangeDetectorRef,
    private _workoutservice: WorkoutService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.indexplan = Number( params['id']);
    });
    this._workoutservice.logs$
      .subscribe((events) => {
        console.log(events);
        if (events != null){
          this.workout = events[this.indexplan];
        }
        this._changeDetectorRef.detectChanges();
      });
  }

  goBack(){
    this._navCtrl.navigateBack([`logs`], {replaceUrl: true})
  }




}
