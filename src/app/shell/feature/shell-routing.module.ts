import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('../../home/feature/home.module')).HomeModule,
      },
      {
        path: 'favourite',
        loadChildren: async () =>
          (await import('../../favorites/feature/favorites.module'))
            .FavoritesModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
