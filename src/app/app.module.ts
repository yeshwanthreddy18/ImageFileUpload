import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FileListComponent } from './file-list/file-list.component';
import { FileComponent } from './file/file.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './services/upload.service';
import { MetadataService } from './services/metadata.service';
import { EventsService } from './services/events.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    FileListComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    UploadService,
    MetadataService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
