import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WorkoutService} from "../../../../core/workout.service";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {StorageService} from "../../../../core/storage.service";

@Component({
  selector: 'app-exerciselist',
  templateUrl: './exerciselist.component.html',
  styleUrls: ['./exerciselist.component.scss'],
})
export class ExerciselistComponent implements OnInit {

  filterTerm: string;
  ExerciseList = []
  constructor(
    private _workoutservice: WorkoutService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _modelCtrl : ModalController,
    private _navCtrl: NavController,
    private _storageService: StorageService,
    private _alertCtrl: AlertController,
  ) { }

  async ngOnInit() {
    await this._storageService.get('exercise').then(data => {
      console.log(data)
      this.ExerciseList = data
    });
  }

  closeModal() {
    this._modelCtrl.dismiss();
  }

  selectExercise(name){
    this._modelCtrl.dismiss(name);
  }


}
