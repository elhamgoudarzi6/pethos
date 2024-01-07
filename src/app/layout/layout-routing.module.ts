import { FavoritesComponent } from './favorites/favorites.component';
import { AuthComponent } from './auth/auth.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { AgentsComponent } from './agents/agents.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertiesComponent } from './properties/properties.component';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'properties',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PropertiesComponent,
      },
    ],
  },
  {
    path: 'property/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PropertyDetailsComponent,
      },
    ],
  },
  {
    path: 'properties/:transaction/:type/:subType',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PropertiesComponent
      },
    ],
  },
  {
    path: 'agents',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AgentsComponent,
      },
    ],
  },
  {
    path: 'agent/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AgentDetailsComponent,
      },
    ],
  },
  {
    path: 'news',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: NewsComponent,
      },
    ],
  },
  {
    path: 'new/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: NewsDetailComponent,
      },
    ],
  },
  {
    path: 'faqs',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FaqsComponent,
      },
    ],
  },
  {
    path: 'terms',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TermsComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
  },
  {
    path: 'about',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      },
    ],
  },
  {
    path: 'favorites',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FavoritesComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AuthComponent,
      },
    ],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../core/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../core/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
