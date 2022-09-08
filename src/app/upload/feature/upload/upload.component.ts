import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {deleteImage, syncState, uploadImage} from "../../data/access/state/upload.actions";
import {getAllImages, getIsUploading, getNumberOfImages} from "../../data/access/state/upload.selectors";
import {UploadService} from '../../data/access/upload.service';
import {Image} from "../../utilities/ImagesInterface";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  images$!: Observable<Image[]>
  numberOfImages$!: Observable<number>;
  isUploading$!: Observable<boolean>;
  file!: File;

  onFileDropped(event: any) {
    for (let file of event) {
      this.store.dispatch(uploadImage({file}));
    }
  }

  onfileInputChange(event: any) {
    this.store.dispatch(uploadImage({file: event.target.files[0]}));
  }

  onDelete(image: Image) {
    this.store.dispatch(deleteImage({image: image}))
  }

  constructor(private uploadService: UploadService, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(syncState());
    this.images$ = this.store.select(getAllImages);
    this.isUploading$ = this.store.select(getIsUploading);
    this.numberOfImages$ = this.store.select(getNumberOfImages);
  }
}
