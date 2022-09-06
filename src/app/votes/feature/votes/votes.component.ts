import { Component, OnInit } from '@angular/core';

import { ApiVotesService } from '../../data-access/services/api-votes.service';
import { VotesStore } from '../../data-access/votes.store';
import { voteImages } from '../../utilities/votesImages.model';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  providers: [VotesStore],
})
export class VotesComponent implements OnInit {
  positiveImages$ = this.store.selectImagesPositive();
  negativeImages$ = this.store.selectImagesNegative();
  images$ = this.votes.getVotedImages();

  constructor(private votes: ApiVotesService, private store: VotesStore) {}

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
