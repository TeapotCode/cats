import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StoreModule} from "@ngrx/store";
import {uploadInitialState, uploadReducer} from "../data/access/state/upload.reducer";
import {DragAndDropDirective} from "../utilities/drag-and-drop.directive";


import {UploadRoutingModule} from './upload-routing.module';
import {UploadComponent} from './upload/upload.component';


@NgModule({
  declarations: [
    UploadComponent,
    DragAndDropDirective
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    StoreModule.forFeature('uploads', uploadReducer),
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [],
  exports: [
    DragAndDropDirective
  ]
})
export class UploadModule { }
