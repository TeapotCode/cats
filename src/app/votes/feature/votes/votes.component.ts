import { Component, OnInit } from '@angular/core';
import { VotesStore } from '../../data-access/votes.store';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  providers: [VotesStore],
})
export class VotesComponent implements OnInit {
  positiveImages$ = this.store.selectOnlyPositivieImage();
  negativeImages$ = this.store.selectOnlyNegativeImage();

  constructor(private store: VotesStore) {}

  ngOnInit(): void {
    this.store.getImages({});
  }
}
