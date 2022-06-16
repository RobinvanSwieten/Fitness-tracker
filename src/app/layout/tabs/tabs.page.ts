import {ChangeDetectorRef, Component} from '@angular/core';
import {WorkoutService} from "../../core/workout.service";
import {AlertController, ModalController} from "@ionic/angular";
import {WorkoutComponent} from "../../modules/workouts/workout/workout.component";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  routine;

  constructor(
    private _workoutservice: WorkoutService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _alertCtrl: AlertController,
    private _modelCtrl : ModalController,
  ) {}

  ngOnInit(): void {
    this._workoutservice.activeProgram$
      .subscribe((events) => {
        console.log(events);
        this.routine = events;
        this._changeDetectorRef.detectChanges();
      });
  }

  async resume(){
    const modal = await this._modelCtrl.create({
      component: WorkoutComponent,
      cssClass: 'ExerciseListModal',
      swipeToClose: false,
    });
    return await modal.present();
  }

  async discard(){
    const alert = await this._alertCtrl.create({
      cssClass: 'alertCtrl',
      header: 'Are you sure you want to discard the workout in progress?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Discard Workout',
          cssClass: 'discard',
          handler: () => {
            this._workoutservice.deleteActiveWorkout()
            this.routine = null;
          }
        }
      ]
    });
    await alert.present();
  }
}
