import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesStore } from '../data-access/api-service/favorites.store';
import { TableComponent } from '../ui/table/table.component';

import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    FavoritesComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatPaginatorModule
  ],
  providers:[FavoritesStore]
})
export class FavoritesModule { }
