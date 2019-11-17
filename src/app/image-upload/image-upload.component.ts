import { Component, OnInit, Output, Input } from '@angular/core';
import { UploadService } from 'app/services/upload.service';
import { EventEmitter } from 'events';
import { FileListComponent } from 'app/file-list/file-list.component';
import { EventsService } from 'app/services/events.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  public uploadFiles: any;
  constructor(private us:UploadService, private es:EventsService) { }


  ngOnInit() {
  }
  onChangeFile(event){
    console.log('event called', event);
    this.uploadFiles =  event
  }
  save(){
    if(!this.uploadFiles) return;
    this.us.upload(this.uploadFiles.target.files).then(res => {
      if (res.statusCode == 200) {
        alert(res.message)
        this.uploadFiles=null;
        this.es.imgUpload.emit('')
      }
    }, err => {
      console.log(err);
    })

  }
}
