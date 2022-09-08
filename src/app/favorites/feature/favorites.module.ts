import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesStore } from '../data-access/api-service/favorites.store';
import { TableComponent } from '../ui/table/table.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DatePipe } from '@angular/common';
import { datePipe } from '../utils/datePipe';


@NgModule({
  declarations: [
    FavoritesComponent,
    TableComponent,
    datePipe
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers:[FavoritesStore]
})
export class FavoritesModule { }
