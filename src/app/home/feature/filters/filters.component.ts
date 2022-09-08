import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as homeAction from '../../data-access/home.action';
import { MimeType } from '../../utils/mime-type.interface';
import {
  selectBreeds,
  selectBreedSelected,
  selectCategories,
  selectCategoriesSelected,
} from '../../data-access/home.selector';
import { MatSelectChange } from '@angular/material/select';
import { selectMimeType } from '../../data-access/home.selector';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  categories$ = this.store.select(selectCategories);
  breeds$ = this.store.select(selectBreeds);

  categoriesSelected$ = this.store.select(selectCategoriesSelected);
  breedSelected$ = this.store.select(selectBreedSelected);

  mimeType$ = this.store.select(selectMimeType);

  constructor(private store: Store) {}

  onCategoryClick(categoryId: number | null) {
    this.store.dispatch(homeAction.switchCategory({ categoryId }));
  }

  onBreedClick(breedId: number | null) {
    this.store.dispatch(homeAction.switchBreed({ breedId }));
  }

  onTypeChange(selectChange: MatSelectChange) {
    // console.log(mimeType);
    this.store.dispatch(
      homeAction.setMimeType({ mimeType: selectChange.value })
    );
  }
}
