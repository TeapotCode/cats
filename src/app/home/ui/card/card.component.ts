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

  liked: boolean = false;
  voteId: string = '';

  constructor() {}

  onLike() {
    this.liked = true;
    this.like.emit();
  }

  onDislike() {
    this.liked = true;
    this.dislike.emit();
  }

  onUndo() {
    this.liked = false;
    this.removeVote.emit(this.image.voteId);
  }
}
