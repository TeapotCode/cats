import { Component, OnInit } from '@angular/core';
import { HomeStore } from '../../data-access/home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: HomeStore) {}

  images$ = this.store.images$;

  ngOnInit(): void {
    // this.store.getImages(10);
  }

  like(imgId: string, value: number) {
    this.store.vote({ image_id: imgId, value });
  }
  dislike(imgId: string, value: number) {
    this.store.vote({ image_id: imgId, value });
  }
  undo(imgId: string, value: number) {
    this.store.vote({ image_id: imgId, value });
  }
}
