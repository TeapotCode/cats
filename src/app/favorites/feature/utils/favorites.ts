export interface Favorites {
    id:         number;
    image_id:   string;
    sub_id:     null;
    created_at: Date;
    image:      Image;
}

export interface Image {
    id:  string;
    url: string;
}
