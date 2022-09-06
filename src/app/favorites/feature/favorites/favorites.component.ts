import { Component, OnInit } from '@angular/core';
import { FavoritesStore } from '../../data-access/api-service/favorites.store';
import { Favorites } from '../../utils/favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private store: FavoritesStore) { }

  favorites$=this.store.favorites$
  images:Favorites[]=[]


  ngOnInit(): void {
    this.store.getFavorites({})
    this.favorites$.pipe().subscribe(x=>{this.images=x;console.log(this.images)})
  }

}
