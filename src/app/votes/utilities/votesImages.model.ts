export interface voteImages {
  id: number;
  image_id: string;
  created_at: string;
  value: number;
  image: {
    id: string;
    url: string;
  };
  isFavorite?: boolean;
  favoriteId?: number;
}
