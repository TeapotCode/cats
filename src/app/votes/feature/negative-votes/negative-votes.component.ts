import { Component, OnInit, Input } from '@angular/core';

import { Images } from '../../utilities/images.model';

@Component({
  selector: 'app-negative-votes',
  templateUrl: './negative-votes.component.html',
  styleUrls: ['./negative-votes.component.scss'],
})
export class NegativeVotesComponent implements OnInit {
  @Input() images!: Images[];
  constructor() {}

  ngOnInit(): void {}
}
