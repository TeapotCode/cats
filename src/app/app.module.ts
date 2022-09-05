import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './shell/utils/api.interceptor';

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
    HttpClientModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },]
})
export class AppModule {}
