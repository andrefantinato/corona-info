import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { Globals } from './globals';
import { AppRoutingModule } from './app-routing.module';
import { FeedComponent } from './feed/feed.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { LinksComponent } from './links/links.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    HeaderComponent,
    ContactComponent,
    ContributorsComponent,
    LinksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
