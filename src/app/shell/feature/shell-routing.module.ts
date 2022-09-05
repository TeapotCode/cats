import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: async () =>
          (await import('../../home/feature/home.module')).HomeModule,
      },
      {
        path: 'upload',
        loadChildren: async () =>
          (await import('../../upload/feature/upload.module')).UploadModule,
      },
      {
        path: 'favourite',
        loadChildren: async () =>
          (await import('../../favorites/feature/favorites.module'))
            .FavoritesModule,
      },
      {
        path: 'votes',
        loadChildren: async () =>
          (await import('../../votes/feature/votes.module')).VotesModule,
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
