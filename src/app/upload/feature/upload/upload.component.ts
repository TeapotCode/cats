import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subscription, take} from "rxjs";
import {addImagesToState, deleteImage, fillStateWithImages} from "../../data/access/state/upload.actions";
import {getAllImages} from "../../data/access/state/upload.selectors";
import {UploadService} from '../../data/access/upload.service';
import {Image} from "../../utilities/ImagesInterface";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  images$!: Observable<Image[]>
  progress!: number;
  file!: File;
  error!: Error;
  private imagesSubscription!: Subscription;
  isLoading!: boolean;

  uploadHelper(file: File) {
    console.table(file);
    this.isLoading = true;
    this.uploadService.upload(file).subscribe(
      result => {

      },
      error => {
        this.error = error;
        this.isLoading = false;
        console.log(this.error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onFileDropped(event: any) {
    for (let file of event) {
      this.uploadHelper(file);
    }
  }

  onfileInputChange(event: any) {
   this.uploadHelper(event.target.files[0]);
  }

  onDelete(image: Image) {
    //this.store.dispatch(deleteImage({image: image}));
    this.uploadService.deleteImage(image).subscribe(result => {
      this.syncStateWIthAPI();
    })
  }

  constructor(private uploadService: UploadService, private store: Store, ) { }

  ngOnInit() {
    this.syncStateWIthAPI();
    this.images$ = this.store.select(getAllImages);
  }

  syncStateWIthAPI() {
    this.uploadService.getUploadedImages().pipe(
      take(1)
    ).subscribe(
      result => {
        this.store.dispatch(fillStateWithImages({images: result}))
      },
      error => {

      },
      () => {

      }
    )
  }

  ngOnDestroy() {

  }
}
