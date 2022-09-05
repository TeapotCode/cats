import { Component, OnInit, Input } from '@angular/core';

import { Images } from '../../utilities/images.model';

@Component({
  selector: 'app-positive-votes',
  templateUrl: './positive-votes.component.html',
  styleUrls: ['./positive-votes.component.scss'],
})
export class PositiveVotesComponent implements OnInit {
  @Input() images!: Images[];

  constructor() {}

  ngOnInit(): void {}
}
