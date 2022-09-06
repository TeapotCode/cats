import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../utils/image.interface';
import { RandomImage } from '../../../shell/utils/randomImage.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() image!: RandomImage;
  @Output() like = new EventEmitter<void>();
  @Output() dislike = new EventEmitter<void>();
  @Output() removeVote = new EventEmitter<number>();
  @Output() favorite = new EventEmitter<number>();

  voteId: string = '';

  constructor() {}

  onLike() {
    this.like.emit();
  }

  onDislike() {
    this.dislike.emit();
  }

  onUndo() {
    this.removeVote.emit(this.image.voteId);
  }

  onFavorite() {
    this.favorite.emit(this.image.favoriteId);
  }
}
