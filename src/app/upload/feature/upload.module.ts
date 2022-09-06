import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
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
  ],
  providers: [],
  exports: [
    DragAndDropDirective
  ]
})
export class UploadModule { }
