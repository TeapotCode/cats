import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ApiVotesService } from '../../data-access/services/api-votes.service';

import { voteImages } from '../../utilities/votesImages.model';

@Component({
  selector: 'app-display-votes',
  templateUrl: './display-votes.component.html',
  styleUrls: ['./display-votes.component.scss'],
})
export class DisplayVotesComponent {
  @Input() images!: voteImages[];
  @Output() dislike = new EventEmitter<number>();
  @Output() like = new EventEmitter<string>();
  @Output() delete = new EventEmitter<number>();

  constructor(private service: ApiVotesService) {}

  onDislike(fav_id: number) {
    this.dislike.emit(fav_id);
  }

  onLike(image_id: string) {
    this.like.emit(image_id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
