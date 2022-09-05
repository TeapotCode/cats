import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { ApiFavoritesService } from './api-service/api-favorites.service';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
  ],
  providers:[ApiFavoritesService]
})
export class FavoritesModule { }
