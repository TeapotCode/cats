import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { ApiFavoritesService } from './api-favorites.service';

export interface FavoritesState {
    cats:Favorites[];
}

@Injectable()
export class FavoritesStore extends ComponentStore<FavoritesState>{
    constructor(private api:ApiFavoritesService){
        super({cats:[]});
    }

    readonly favorites$:Observable<Favorites[]>=this.select((state)=>state.cats);

    protected addFavorites=this.updater((state,cats:Favorites[])=>(
        {
            ...state,
            cats:[...state.cats,...cats]
        }
    ));

    selectFavorites():Observable<Favorites[]>{
        return this.select((state)=>state.cats);
    }

    readonly getFavorites=this.effect((cats$:Observable<unknown>)=>
    {
        return cats$.pipe(
            switchMap((cats$)=>
            {
                return this.api.getFavorites();
            }),
            tap((response=>this.addFavorites(response)))
        )
    }

    )
}