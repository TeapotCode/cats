import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { VotesRoutingModule } from './votes-routing.module';
import { VotesComponent } from './votes/votes.component';
import { DisplayVotesComponent } from '../ui/display-votes/display-votes.component';

import { CustomDatePipe } from '../utilities/custom.datepipe';

@NgModule({
  declarations: [VotesComponent, DisplayVotesComponent, CustomDatePipe],
  imports: [
    CommonModule,
    VotesRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class VotesModule {}
