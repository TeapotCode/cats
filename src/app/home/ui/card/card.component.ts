import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../utils/image.interface';
import { RandomImage } from '../../utils/randomImage.interface';
import { Store } from '@ngrx/store';
import { switchFavorite } from '../../data-access/home.action';
import {
  likeImage,
  dislikeImage,
  removeVote,
} from '../../data-access/home.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() image!: RandomImage;

  constructor(private store: Store) {}

  onLike() {
    this.store.dispatch(likeImage({ imageId: this.image.imageId }));
  }

  onDislike() {
    this.store.dispatch(dislikeImage({ imageId: this.image.imageId }));
  }

  onUndo() {
    this.store.dispatch(
      removeVote({ voteId: this.image.voteId, imageId: this.image.imageId })
    );
  }

  onFavorite() {
    this.store.dispatch(switchFavorite({ imageId: this.image.imageId }));
  }
}
