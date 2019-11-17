import { Injectable, Output ,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
  @Output() imgUpload : EventEmitter<string> =new EventEmitter()

  uploadEvent(){
    this.imgUpload.emit("");
  }
}
