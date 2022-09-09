import { Component, OnInit } from '@angular/core';
import { async, combineLatest, Observable } from 'rxjs';
import { selectFavouritesImages, selectVotedImages } from 'src/app/shell/data-access/cats.selector';
import { FavoritesStore } from '../../data-access/api-service/favorites.store';
import { Api } from 'src/app/shell/utils/api.interfaces';
import { Store } from '@ngrx/store';
import { forkJoin } from "rxjs"
import { toVote } from '../../utils/toVote';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers:[FavoritesStore]
})



export class FavoritesComponent implements OnInit {

  constructor(private store: Store, private favoriteStore:FavoritesStore) {}
  favorites$=this.favoriteStore.selectFavorites();
  loader$:Observable<boolean>=this.favoriteStore.selectLoader();

  ngOnInit(): void {
    this.favoriteStore.getFavorites({})
  }


  dislike(cat:toVote){
    // this.favoriteStore.delete(cat)
    this.favoriteStore.dislike(cat)
  }

  remove(cat:toVote){
    this.favoriteStore.delete(cat)
  }

  like(cat:toVote){
    this.favoriteStore.like(cat)
  }
}

