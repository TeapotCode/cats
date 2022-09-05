import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { HomeStore } from '../data-access/home.store';
import { CardComponent } from '../ui/card/card.component';
import { FiltersComponent } from './filters/filters.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, FiltersComponent, CardComponent],
  imports: [CommonModule, HomeRoutingModule, MatIconModule],
  providers: [HomeStore],
})
export class HomeModule {}
