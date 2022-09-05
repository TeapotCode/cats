import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from '../ui/card/card.component';

@NgModule({
  declarations: [HomeComponent, FiltersComponent, CardComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
