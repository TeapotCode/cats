import { Component, OnInit } from '@angular/core';

import { ApiVotesService } from '../../data-access/services/api-votes.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit {
  // positiveImages$ = this.votes.selectOnlyPositivieImage();
  // negativeImages$ = this.votes.selectOnlyNegativeImage();
  // images$ = this.votes.getVotedImages();

  // constructor(private votes: ApiVotesService) {}

  ngOnInit(): void {
    // this.votes.getVotedImagesWithFavorites();
  }

  // onDislike(fav_id: number) {
  //   this.votes.dislikeImage(fav_id);
  // }

  // onLike(image_id: string) {
  //   this.votes.likeImage(image_id);
  // }

  // onDeleteVote(vote_id: number) {
  //   this.votes.deleteVote(vote_id);
  // }
}
