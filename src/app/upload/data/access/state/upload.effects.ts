import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, exhaustMap, map, switchMap, tap} from "rxjs";
import { UploadService } from "../upload.service";
import * as UploadActions from './upload.actions';
import { fillStateWithImages } from "./upload.actions";
import {UploadState} from "./upload.reducer";

@Injectable()
export class UploadEffects {
  syncStateEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadActions.syncState),
      switchMap(() => {
        return this.uploadService.getUploadedImages().pipe(
          map(response => fillStateWithImages({images: response}), catchError(async (error) => this.matSnackBar.open("Can't get data from server."))
          ));
      })
    )
  })

  constructor(private actions$: Actions, private uploadService: UploadService, private store: Store, private matSnackBar: MatSnackBar ) {
  }
}

