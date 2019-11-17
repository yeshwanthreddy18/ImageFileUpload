import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'app/services/metadata.service';
import { environment } from '../../environments/environment';
import { EventsService } from 'app/services/events.service';

const imageURI = environment.imageUrl
@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  private rawMetadata = [];
  private imagePreviewData: any = {};
  private imageUrl:any=''
  constructor(private mds: MetadataService,private es:EventsService) { }

  ngOnInit() {
    this.es.imgUpload.subscribe(event=>{
      this.fetchMetadata();
    })
    this.fetchMetadata();
    this.imageUrl=imageURI;
  }

  fetchMetadata(query = {}) {
    this.mds.get(query).subscribe((res) => {
      this.rawMetadata = res.data;
      this.imagePreviewData = res.data ? res.data[0].data : null;
    }, (err) => {
      alert(err.message);
    })
  }

  previewImage(item) {
    this.imagePreviewData = item.data;
    console.log(item);
  }

}
