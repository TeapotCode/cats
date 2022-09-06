export interface voteImages {
  id: number;
  image_id: string;
  created_at: string;
  value: number;
  country_code: string;
  image: {
    id: string;
    url: string;
  };
  favorite?: boolean;
  fav_id?: number;
}
