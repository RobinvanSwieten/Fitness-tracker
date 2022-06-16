import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {StorageService} from "../../core/storage.service";
import {WorkoutService} from "../../core/workout.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  logs;
  constructor(
    private _navCtrl: NavController,
    private _modelCtrl : ModalController,
    private _storageService: StorageService,
    private _workoutservice: WorkoutService,
    private _alertCtrl: AlertController,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._workoutservice.getLogs();
    this._workoutservice.logs$
      .subscribe((events) => {
        console.log(events);
        if (events != null){
          this.logs = events;
        }
        this._changeDetectorRef.detectChanges();
      });
    console.log(this.logs);
  }

  goToWorkout(index){
    this._navCtrl.navigateForward([`logs/workout`, index], {replaceUrl: true})
  }

}
