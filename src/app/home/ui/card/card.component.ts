import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../utils/image.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() image!: Image;
  @Output() like = new EventEmitter<void>();
  @Output() dislike = new EventEmitter<void>();
  @Output() undo = new EventEmitter<void>();

  liked: boolean = false;

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
    this.undo.emit();
  }
}
