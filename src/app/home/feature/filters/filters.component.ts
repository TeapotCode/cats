import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as homeAction from '../../data-access/home.action';
import {
  selectBreeds,
  selectBreedSelected,
  selectCategories,
  selectCategoriesSelected,
} from '../../data-access/home.selector';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  categories$ = this.store.select(selectCategories);
  breeds$ = this.store.select(selectBreeds);

  categoriesSelected$ = this.store.select(selectCategoriesSelected);
  breedSelected$ = this.store.select(selectBreedSelected);

  constructor(private store: Store) {}

  onCategoryClick(categoryId: number | null) {
    this.store.dispatch(homeAction.switchCategory({ categoryId }));
  }

  onBreedClick(breedId: number | null) {
    this.store.dispatch(homeAction.switchBreed({ breedId }));
  }
}
