export interface Notification {
  name: string;
  date: number;
  id: number;
  type?: 'favourites' | 'votes';
  action?: 'like' | 'unlike';
}
