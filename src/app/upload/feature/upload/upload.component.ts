import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../data/access/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  loading: boolean = false; // Flag variable
  progress!: number;

  upload(file: File) {
    this.loading = !this.loading;
    this.uploadService.upload(file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.loading = false;
        }
      }
    );
  }

  onFileDropped(event: any) {
    console.log(`Event: ${event}`)
    console.table(event);
    for (let file of event) {
      this.upload(file);
    }
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  fileBrowserHandler(event: any) {
    this.upload(event.target.files[0]);
  }
}
