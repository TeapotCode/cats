import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, merge, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Favorites } from '../../utils/favorites';
import { ApiFavoritesService } from './api-favorites.service';
import { toVote } from '../../utils/toVote';

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

    protected updateFavorites=this.updater((state,cats:Favorites[])=>(
        {
            ...state,
            cats
        }
    ));

    protected ifLike = this.updater((state, id: toVote) => {
        let modifiedState=JSON.parse(JSON.stringify([...state.cats]));
        modifiedState.map((data:any)=>
        {
            if(data.image_id===id.image_id)
            {
                data.vote=1
            }
        })
        return{
            ...state,
            cats:[...modifiedState]
        }
    })

    protected ifDislike = this.updater((state, id: toVote) => {
        let modifiedState=JSON.parse(JSON.stringify([...state.cats]));
        modifiedState.map((data:any)=>
        {
            if(data.image_id===id.image_id)
            {
                data.vote=-1
            }
        })
        return{
            ...state,
            cats:[...modifiedState]
        }})

    protected ifRemoveVote= this.updater((state, id: toVote) => {
        let modifiedState=JSON.parse(JSON.stringify([...state.cats]));
        modifiedState.map((data:any)=>
        {
            if(data.image_id===id.image_id)
            {
                data.vote=null
            }
        })
        return{
            ...state,
            cats:[...modifiedState]
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

    
    readonly like=this.effect((cats$:Observable<toVote>)=>
    {
        return cats$.pipe(
            mergeMap((cat)=>
            this.api.sendVote(1,cat.image_id).pipe(
                tap(
                    {
                        next:(result)=>this.ifLike(cat),
                        error:(e)=>console.error(e)
                    }
                )
            ))
         )
        
    })

    readonly dislike=this.effect((cats$:Observable<toVote>)=>
    {
        return cats$.pipe(
            mergeMap((cat)=>
            this.api.sendVote(-1,cat.image_id).pipe(
                tap(
                    {
                        next:(result)=>this.ifDislike(cat),
                        error:(e)=>console.error(e)
                    }
                )
            ))
         )
        
    })

    readonly delete=this.effect((cats$:Observable<toVote>)=>
    {
        return cats$.pipe(
            mergeMap((cat)=>
            this.api.removeVote(cat.voteId).pipe(
                tap(
                    {
                        next:(result)=>this.ifRemoveVote(cat),
                        error:(e)=>console.error(e)
                    }
                )
            ))
         )
        
    });
}