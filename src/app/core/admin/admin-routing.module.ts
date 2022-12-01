import { LoginComponent } from './login/login.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AgentsComponent } from './agents/agents.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { FaqsComponent } from './faqs/faqs.component';
import { NewsComponent } from './news/news.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { SlidersComponent } from './sliders/sliders.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitRequestsComponent } from './visit-requests/visit-requests.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'administrators',
        component: AdministratorsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'agents',
        component: AgentsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'discounts',
        component: DiscountsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'faqs',
        component: FaqsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'news',
        component: NewsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'properties',
        component: PropertiesComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'property-types',
        component: PropertyTypesComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'sliders',
        component: SlidersComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'messages',
        component: ContactMessagesComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'tickets',
        component: TicketsComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'requests',
        component: VisitRequestsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
