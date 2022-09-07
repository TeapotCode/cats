import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [HomeComponent, FiltersComponent, CardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature(homeReducerKey, homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    NgOptimizedImage,
    ScrollingModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class HomeModule {}
