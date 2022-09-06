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
    country_code: string;
    image: {
      id: string;
      url: string;
    };
  }

  export interface FavoriteImage {
    id: number;
    image_id: string;
    sub_id?: string;
    created_at: Date;
    image: {
      id: string;
      url: string;
    };
    value?:number;
  }
}
