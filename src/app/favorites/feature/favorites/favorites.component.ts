import { Component, OnInit } from '@angular/core';
import { ApiFavoritesService } from '../api-service/api-favorites.service';
import { Favorites } from '../utils/favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private api:ApiFavoritesService) { }

  favorites:Favorites[]=[]

  ngOnInit(): void {
  }

  test()
  {
    this.api.getFavorites().pipe().subscribe(x=>{this.favorites=x;console.log(this.favorites)})
  }

}
