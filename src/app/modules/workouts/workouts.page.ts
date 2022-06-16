import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from "@ionic/angular";
import { WorkoutComponent } from "./workout/workout.component";
import {StorageService} from "../../core/storage.service";
import {workout} from "../../core/workout.types";
import {WorkoutService} from "../../core/workout.service";
import {map} from "rxjs/operators";
import {subscribeTo} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  public workouts;
  constructor(
    private _navCtrl: NavController,
    private _modelCtrl : ModalController,
    private _storageService: StorageService,
    private _workoutservice: WorkoutService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _alertCtrl: AlertController,
  ) { }

  async ngOnInit(
  ) {
    await this._workoutservice.getExcercise();
    this._workoutservice.workouts$
      .subscribe((events) => {
        if (events != null){
          this.workouts = events;

        }
        this._changeDetectorRef.detectChanges();
      });
  }

  async goToWorkout(){
    const modal = await this._modelCtrl.create({
      component: WorkoutComponent,
      cssClass: 'ExerciseListModal',
      swipeToClose: false,
    });
    return await modal.present();
  }

  async startWorkout(workoutid = null){
     var result;
     this._workoutservice.activeProgram$.pipe()
     .subscribe((data) => {
       result = data
      });

    if (result == null) {
      if (workoutid != null) {
        this.templateWorkout(this.workouts[workoutid])
      } else {
        this.newWorkout()
      }
    } else {
      this.Discard()
    }

  }

  async templateWorkout(routine){
    this._workoutservice.setActiveWorkout(routine)
    this.goToWorkout();
  }

  async newWorkout(){
    var routine: workout = {
      name: '',
      exercise: [],
      timer: {
        h: '00',
        m: '00',
        s: '00'
      }
    }
    this._workoutservice.setActiveWorkout(routine)
    this.goToWorkout();
  }

  async Discard(){
    const alert = await this._alertCtrl.create({
      cssClass: 'alertCtrl',
      header: 'You have a workout in progress',
      message: 'if you start a new workout, your old workout wil be permanenlty deleted.',
      buttons: [
        {
          text: 'Start new workout',
          handler: () => {
            this.newWorkout()
          }
        },
        {
          text: 'Resume workout in progress',
          role: 'cancel',
          handler: () => {
            this.goToWorkout()
          }
        }, {
          text: 'Cancel',
        }
      ]
    });
    await alert.present();
  }

}
