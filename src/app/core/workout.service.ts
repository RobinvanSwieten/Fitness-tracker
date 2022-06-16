import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private _workouts: BehaviorSubject<any>  = new BehaviorSubject(null);
  private _activeprogram: BehaviorSubject<any>  = new BehaviorSubject(null);
  private _exerciselist: BehaviorSubject<any>  = new BehaviorSubject(null);
  private _logs: BehaviorSubject<any>  = new BehaviorSubject(null);

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
  ) { }

  get workouts$()
  {
    return this._workouts.asObservable();
  }

  get activeProgram$()
  {
    return this._activeprogram.asObservable();
  }

  get exerciseList$()
  {
    return this._exerciselist.asObservable();
  }

  get logs$(){
    return this._logs.asObservable();
  }


  async getWorkouts(){
    return this._storageService.get('workouts').then(data => {
      this._workouts.next(data);
    });
  }

  async getActiveProgram(){
   return this._storageService.get('activeroutine').then(data => {
      this._activeprogram.next(data);
    });
  }

  async setActiveWorkout(data)
  {
    await this._storageService.store('activeroutine', data)
    this._activeprogram.next(data);
  }

  async deleteActiveWorkout() {
    await this._storageService.removeStorageItem('activeroutine')
    this._activeprogram.next(null);
  }

  async getExcercise()
  {
    await this._httpClient.get('https://wger.de/api/v2/exercise/?format=json&language=2&limit=400').subscribe(
      async (res: any) => {
        if (res) {
          this._storageService.store('exercise', res.results)
        }
      }
    );
  }

  async logWorkout(workout){
    workout.date =  new Date();
    const data = [workout]
    console.log(data);
    await this._storageService.add('logs', data)
    this.getLogs()
  }

  async getLogs(){
    return this._storageService.get('logs').then(data => {
      if (data != null){
        this._logs.next(data.reverse());
      }
    });
  }

  async saveWorkout(workout){
    const data = [workout]
    console.log(data);
    await this._storageService.add('workouts', data)
    this.getWorkouts();
  }

}
