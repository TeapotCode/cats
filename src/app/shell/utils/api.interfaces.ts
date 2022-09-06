export namespace Api {
  export interface RandomImage {
    id: string;
    url: string;
    width: number;
    height: number;
  }

  export interface VoteImage {
    id: number;
    image_id: string;
    created_at: string;
    value: number;
    image: {
      id: string;
      url: string;
    };
  }

  export interface FavoriteImage {
    id: number;
    image_id: string;
    created_at: Date;
    image: {
      id: string;
      url: string;
    };
  }
}

export interface VoteFavImage extends Api.VoteImage {
  favoriteId?: number;
  isFavorite?: boolean;
}

export interface FavoriteVoteImage extends Api.FavoriteImage {
  voteId?: number;
  vote?: number;
}
