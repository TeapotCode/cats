import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VotesStore } from '../../data-access/votes.store';
import { voteImages } from '../../utilities/votesImages.model';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  providers: [VotesStore],
})
export class VotesComponent implements OnInit {
  positiveImages$: Observable<voteImages[]> = this.store.selectImagesPositive();
  negativeImages$: Observable<voteImages[]> = this.store.selectImagesNegative();
  images$: Observable<voteImages[]> = this.store.selectImages();
  loader$: Observable<boolean> = this.store.selectLoader();

  constructor(private store: VotesStore) {}

  ngOnInit(): void {
    this.store.getImages({});
  }

  onDislike(fav_id: number) {
    this.store.dislikeImage(fav_id);
  }

  onLike(image_id: string) {
    this.store.likeImage(image_id);
  }

  onDeleteVote(vote_id: number) {
    this.store.deleteImageVote(vote_id);
  }
}
