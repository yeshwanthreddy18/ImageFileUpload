import { Component, OnInit,Input } from '@angular/core';
import { EventsService } from 'app/services/events.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() imagePreviewData: any;
  constructor() { }
  private imageUrl:any=''
  ngOnInit() {
   
  }
}
