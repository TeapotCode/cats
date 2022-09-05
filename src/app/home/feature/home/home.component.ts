import { Component, OnInit } from '@angular/core';
import { HomeStore } from '../../data-access/home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: HomeStore) {}

  ngOnInit(): void {
    // this.store.getImages(10);
  }
}
