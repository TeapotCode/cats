import { state } from '@angular/animations';
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

    //reducers

    readonly favorites$:Observable<Favorites[]>=this.select((state)=>state.cats);

    protected addFavorites=this.updater((state,cats:Favorites[])=>(
        {
            ...state,
            cats:[...state.cats,...cats]
        }
    ));

    protected updateFAvorites=this.updater((state,cats:Favorites[])=>(
        {
            ...state,
            cats
        }
    ));

     ifLike = this.updater((state, id: string) => {
        const cat: Favorites[] = state.cats.map((img) =>
          img.image_id===id
            ?{...img,voted:1}:img
        );
        return{
            ...state,
            cats:cat
        }})

     ifDislike = this.updater((state, id: string) => {
        const cat: Favorites[] = state.cats.map((img) =>
          img.image_id===id
            ?{...img,voted:-1}:img
        );
        return{
            ...state,
            cats:cat
        }})

     ifRemoveVote= this.updater((state, id: string) => {
        const cat: Favorites[] = state.cats.map((img) =>
          img.image_id===id
            ?{...img,voted:null}:img
        );
        return{
            ...state,
            cats:cat
        }})

    //selectors

    selectFavorites():Observable<Favorites[]>{
        return this.select((state)=>state.cats);
    }

    //effects

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