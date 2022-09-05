import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';

import { VotesRoutingModule } from './votes-routing.module';
import { VotesComponent } from './votes/votes.component';
import { PositiveVotesComponent } from './positive-votes/positive-votes.component';
import { NegativeVotesComponent } from './negative-votes/negative-votes.component';
import { CardComponent } from '../ui/card/card.component';

@NgModule({
  declarations: [
    VotesComponent,
    PositiveVotesComponent,
    NegativeVotesComponent,
    CardComponent,
  ],
  imports: [CommonModule, VotesRoutingModule, MatListModule],
})
export class VotesModule {}
