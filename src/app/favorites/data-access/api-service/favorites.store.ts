import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, merge, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { ApiFavoritesService } from './api-favorites.service';
import { toVote } from '../../utils/toVote';

export interface FavoritesState {
    cats: Favorites[];
    loader: boolean;
}

@Injectable()
export class FavoritesStore extends ComponentStore<FavoritesState>{
    constructor(private api: ApiFavoritesService) {
        super({ cats: [], loader: false });
    }

    //reducers

    readonly favorites$: Observable<Favorites[]> = this.select((state) => state.cats);

    protected addFavorites = this.updater((state, cats: Favorites[]) => (
        {
            ...state,
            cats: [...state.cats, ...cats]
        }
    ));

    protected updateFavorites = this.updater((state, cats: Favorites[]) => (
        {
            ...state,
            cats
        }
    ));

    protected updateLoader = this.updater((state) => ({
        ...state,
        loader: !state.loader
    }))

    protected ifLike = this.updater((state, id: toVote) => {
        console.log('like', id);
        const newImage: Favorites[] = state.cats.map((img) =>{
            if (img.image_id === id.image_id) {
                console.log({...img, vote: 1})
                return { ...img, vote: 1 }
            } else {
    
                return img
            }}
        );

        return {
            ...state,
            image: newImage,
        };
    });

    protected ifDislike = this.updater((state, id: toVote) => {
        console.log('dislike', id);
        const newImage: Favorites[] = state.cats.map((img) =>{
            if (img.image_id === id.image_id) {
                console.log({...img, vote: -1})
                return { ...img, vote: -1 }
            } else {
    
                return img
            }}
        );

        return {
            ...state,
            image: newImage,
        };
    });

    protected ifRemoveVote = this.updater((state, id: toVote) => {
        const newImage: Favorites[] = state.cats.map((img) =>{
        if (img.image_id === id.image_id) {
            console.log({...img, vote: 0})
            return { ...img, vote: 0 }
        } else {

            return img
        }}
    );

        return {
            ...state,
            image: newImage,
        };
    });

    //selectors

    selectFavorites(): Observable<Favorites[]> {
        return this.select((state) => state.cats);
    }

    selectLoader(): Observable<boolean> {
        return this.select((state) => state.loader);
    }

    //effects

    readonly getFavorites = this.effect((cats$: Observable<unknown>) => {
        return cats$.pipe(
            tap(() => this.updateLoader()),
            switchMap((_) =>
                this.api.getFavorites().pipe(
                    tap({
                        next: (result) => {
                            this.updateFavorites(result);
                            this.updateLoader();
                        },
                        error: (e) => console.error(e)
                    })
                )
            )
        )
    }
    )


    readonly like = this.effect((cats$: Observable<toVote>) => {
        return cats$.pipe(
            mergeMap((cat) =>
                this.api.sendVote(1, cat.image_id).pipe(
                    tap(
                        {
                            next: (result) => this.ifLike(cat),
                            error: (e) => console.error(e)
                        }
                    )
                ))
        )

    })

    readonly dislike = this.effect((cats$: Observable<toVote>) => {
        return cats$.pipe(
            mergeMap((cat) =>
                this.api.sendVote(-1, cat.image_id).pipe(
                    tap(
                        {
                            next: (result) => this.ifDislike(cat),
                            error: (e) => console.error(e)
                        }
                    )
                ))
        )

    })

    readonly delete = this.effect((cats$: Observable<toVote>) => {
        return cats$.pipe(
            mergeMap((cat) =>
                this.api.removeVote(cat.voteId).pipe(
                    tap(
                        {
                            next: (result) => this.ifRemoveVote(cat),
                            error: (e) => console.error(e)
                        }
                    )
                ))
        )

    });
}