import { VisitRequestsComponent } from './visit-requests/visit-requests.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'properties',
        component: PropertiesComponent,
      },
    ],
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'tickets',
        component: TicketsComponent,
      },
    ],
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'visit-requests',
        component: VisitRequestsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
