import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  dislikeImage,
  likeImage,
  removeVote,
  switchFavorite,
} from '../../data-access/home.action';
import { RandomImage } from '../../utils/randomImage.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
