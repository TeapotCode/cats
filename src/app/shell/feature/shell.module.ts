import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { CatsEffects } from '../data-access/cats.effect';
import { catsReducer, catsReducerKey } from '../data-access/cats.reducer';
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { shellRoutes } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [ShellComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(shellRoutes),
    StoreModule.forRoot({ [catsReducerKey]: catsReducer }),
    EffectsModule.forRoot([CatsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  exports: [RouterModule],
})
export class ShellModule {}
