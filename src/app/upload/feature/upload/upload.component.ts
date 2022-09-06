import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {UploadService} from '../../data/access/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  loading: boolean = false; // Flag variable
  progress!: number;
  file!: File;
  error!: Error;

  upload(file: File) {
    this.loading = true;
    this.uploadService.upload(file).subscribe(
      result => {
        console.log('Success!')
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log(this.error);
      },
      () => {
        this.loading = false;
        console.log('Finished upload')
        this.uploadService.getUploadedImages().subscribe(
          result => {
          },
          error => {

          },
          () => {

          }
        )
      }
    );
  }

  onFileDropped(event: any) {
    console.log(`Event: ${event}`)
    console.table(event);
    for (let file of event) {
      this.uploadFile(file);
    }
  }

  fileBrowserHandler(event: any) {
   this.uploadFile(event.target.files[0]);
  }

  uploadFile(file: File) {
    this.file = file;
    this.upload(this.file);
  }

  constructor(private uploadService: UploadService, private store: Store) { }
}
