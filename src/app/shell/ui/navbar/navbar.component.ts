import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllNotifications } from '../../data-access/cats.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  notifications = this.store.select(selectAllNotifications);
  constructor(private store: Store) {}
}
