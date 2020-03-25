import { PainelComponent } from './painel/painel.component';
import { LinksComponent } from './links/links.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { ContactComponent } from './contact/contact.component';
import { FeedComponent } from './feed/feed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'noticias', redirectTo: '', pathMatch: 'full' },
  { path: 'contato', component: ContactComponent, pathMatch: 'full' },
  { path: 'links', component: LinksComponent, pathMatch: 'full' },
  { path: 'colaboradores', component: ContributorsComponent, pathMatch: 'full' },
  { path: 'painel', component: PainelComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(appRoutes) ]
})
export class AppRoutingModule { }
