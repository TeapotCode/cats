import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, map, switchMap } from 'rxjs';
import { ApiHomeService } from './api-cats.service';
import * as catsActions from './cats.action';
@Injectable()
export class CatsEffects {
  loadApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.loadFromApi),
      switchMap(() =>
        forkJoin([this.api.getVotes(), this.api.getFavourites()])
      ),
      map(([votes, fav]) =>
        catsActions.setImagesWithVote({ voteImages: votes, favImages: fav })
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiHomeService) {}
}
