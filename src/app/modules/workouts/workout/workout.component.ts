import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {WorkoutService} from "../../../core/workout.service";
import {StorageService} from "../../../core/storage.service";
import {workout} from "../../../core/workout.types";
import {ExerciselistComponent} from "./exerciselist/exerciselist.component";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})


export class WorkoutComponent implements OnInit {

  public workout: workout = {}

  constructor(
    private _workoutservice: WorkoutService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _modelCtrl : ModalController,
    private _navCtrl: NavController,
    private _storageService: StorageService,
    private _alertCtrl: AlertController,
  ) {}

  ngOnInit(): void {
    this._workoutservice.activeProgram$
      .subscribe((events) => {
        console.log(events);
        if (events != null){
          this.workout = events;
        }
        this._changeDetectorRef.detectChanges();
      });
  }

  async finishWorkout(){
    const alert = await this._alertCtrl.create({
      cssClass: 'alertCtrl',
      header: 'Finsh Workout?',
      message: 'All empty sets wil be removed!',
      buttons: [
        {
          text: 'Finish',
          handler: () => {
            this._workoutservice.deleteActiveWorkout();
            this.logWorkout();
            this._modelCtrl.dismiss()
          }
        }, {
          text: 'Cancel',
        }
      ]
    });
    await alert.present();
  }

  logWorkout(){
    var I1 = this.workout.exercise.length
    while (I1--){
      console.log('index1:',I1);
      var I2 = this.workout.exercise[I1].sets.length;
      while (I2--){
        if (this.workout.exercise[I1].sets[I2].checked == false){
          this.workout.exercise[I1].sets.splice(I2, 1);
        }
      }
      if (this.workout.exercise[I1].sets.length === 0){
        this.workout.exercise.splice(I1, 1);
      }
    }
    this._workoutservice.logWorkout(this.workout);
  }

  dismissModal(){
    console.log(this.workout)
    this._workoutservice.setActiveWorkout(this.workout)
    this._modelCtrl.dismiss()
  }

  async addExercise(){
    const modal = await this._modelCtrl.create({
      component: ExerciselistComponent,
      cssClass: 'ExerciseListModal',
      swipeToClose: false,
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data['data']) {
          var index = this.workout.exercise.length
          this.workout.exercise[index] =
            {
              name: data['data'],
              sets: [ {
                checked: false,
                reps: '',
                kg: '',
              }]
            };
        }
      });
    return await modal.present();
  }

  deleteRep(indexExercise, indexSets){
    if (this.workout.exercise[indexExercise].sets.length === 1){
      this.workout.exercise.splice(indexExercise, 1);
    }
    this.workout.exercise[indexExercise].sets.splice(indexSets, 1);
  }

  DeleteExercise(index){
    this.workout.exercise.splice(index, 1);
  }

  addRep(index){
    const indexRep = this.workout.exercise[index].sets.length;
    this.workout.exercise[index].sets[indexRep] =   {
      checked: false,
      reps: '',
      kg: ''
    };
  }

  setCheckBox(event, indexExercise, indexSets){
    this.workout.exercise[indexExercise].sets[indexSets].checked = event.detail.checked
  }

  saveTemplate(){
    var I1 = this.workout.exercise.length
    while (I1--){
      var I2 = this.workout.exercise[I1].sets.length;
      while (I2--){
        this.workout.exercise[I1].sets[I2].checked = false
      }
    }
    this._workoutservice.saveWorkout(this.workout);
  }

}
