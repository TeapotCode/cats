import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../ui/card/card.component';
import { FiltersComponent } from './filters/filters.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { homeReducerKey, homeReducer } from '../data-access/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from '../data-access/home.effect';

@NgModule({
  declarations: [HomeComponent, FiltersComponent, CardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    StoreModule.forFeature(homeReducerKey, homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
