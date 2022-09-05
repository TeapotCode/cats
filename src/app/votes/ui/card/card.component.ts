import { Component, OnInit, Input } from '@angular/core';

import { Images } from '../../utilities/images.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() img!: Images;

  constructor() {}

  ngOnInit(): void {}
}
