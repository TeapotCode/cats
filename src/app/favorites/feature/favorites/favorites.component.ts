import { Component, OnInit } from '@angular/core';
import { async, combineLatest, Observable } from 'rxjs';
import { selectFavouritesImages, selectVotedImages } from 'src/app/shell/data-access/cats.selector';
import { FavoritesStore } from '../../data-access/api-service/favorites.store';
import { Api } from 'src/app/shell/utils/api.interfaces';
import { Store } from '@ngrx/store';
import { forkJoin } from "rxjs"

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})



export class FavoritesComponent implements OnInit {

  constructor(private store: Store) {}
  favorites$=this.store.select(selectFavouritesImages)

  ngOnInit(): void {

  }

  ngOnViewInit(){
    this.favorites$=this.store.select(selectFavouritesImages)
  }
}

