import { LoginComponent } from './login/login.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentComponent } from './agent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyVisitRequestsComponent } from './my-visit-requests/my-visit-requests.component';
import { ProfileComponent } from './profile/profile.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';

const routes: Routes = [
  {
    path: '',
    component: AgentComponent,
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
    component: AgentComponent,
    children: [
      {
        path: 'my-tickets',
        component: MyTicketsComponent,
      },
    ],
  },
  {
    path: '',
    component: AgentComponent,
    children: [
      {
        path: 'my-requests',
        component: MyVisitRequestsComponent,
      },
    ],
  },
  {
    path: '',
    component: AgentComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '',
    component: AgentComponent,
    children: [
      {
        path: 'my-properties',
        component: MyPropertiesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {}
