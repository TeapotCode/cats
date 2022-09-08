import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, map, Observable, startWith, switchMap, tap} from "rxjs";
import {UploadService} from "../upload.service";
import * as UploadActions from './upload.actions';

@Injectable()
export class UploadEffects {
  syncStateEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadActions.syncState),
      switchMap(() => this.uploadService.getUploadedImages()),
      map(response => UploadActions.fillStateWithImages({images: response})),
      catchSwitchMapError((error) => UploadActions.displayServerError({error: error}))
    )
  })

  deleteUploadEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadActions.deleteImage),
      switchMap(action => this.uploadService.deleteImage(action.image)),
      map(() => UploadActions.syncState()),
      catchSwitchMapError((error) => UploadActions.displayServerError({error: error}))
    )
  })

  uploadImageEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadActions.uploadImage),
      tap(() => this.store.dispatch(UploadActions.startLoading())),
      switchMap(action => this.uploadService.upload(action.file)),
      map(() => UploadActions.syncState()),
      catchSwitchMapError((error) => UploadActions.displayServerError({error: error}))
    )
  })

  displayErrorEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadActions.displayServerError),
      tap(() => this.matSnackBar.open('Server error occured'))
    )
  })

  constructor(private actions$: Actions, private uploadService: UploadService, private store: Store, private matSnackBar: MatSnackBar ) {
  }
}

export const catchSwitchMapError = (errorAction: (error: any) => any) =>
    <T>(source: Observable<T>) => source.pipe(catchError((error, innerSource) => innerSource.pipe(startWith(errorAction(error)))));

