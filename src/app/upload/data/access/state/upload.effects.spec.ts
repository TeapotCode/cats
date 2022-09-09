import {TestBed} from "@angular/core/testing";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {provideMockActions} from "@ngrx/effects/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Observable, of} from "rxjs";
import {displayServerError} from "./upload.actions";
import {UploadEffects} from "./upload.effects";
import {provideMock} from "@testing-library/angular/jest-utils";

let actions$: Observable<any>;
let store: MockStore;
let effects: any;
let snackBar: any;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      UploadEffects,
      provideMockStore({}),
      provideMockActions(() => actions$),
      provideMock()
    ],
    imports: [
      MatSnackBarModule
    ]
  })

  store = TestBed.inject(MockStore);
  effects = TestBed.inject(UploadEffects)
  snackBar = TestBed.inject(SnackBar)
})

describe('UploadEffects', () => {
  it('should open dialog if error occured', () => {
    actions$ = of(displayServerError);
    effects.displayErrorEffect$.subscribe(() => {
      expect()
    })
  })
})
