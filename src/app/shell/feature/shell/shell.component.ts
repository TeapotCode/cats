import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as catsAction from '../../data-access/cats.action';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(catsAction.loadFromApi());
  }
}
