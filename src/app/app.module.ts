import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './shell/utils/api.interceptor';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shell/feature/shell.module').then((m) => m.ShellModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },]
})
export class AppModule {}
