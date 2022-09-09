export interface Favorites {
    id:         number;
    image_id:   string;
    created_at?: Date;
    image: {
        id: string;
        url: string;
      };
    voteId?: number;
    vote?: number;
}
