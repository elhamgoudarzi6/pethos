import { AngularMaterialListModule } from './../../angular-material-list.module';
import { PrimengListModule } from './../../primeng-list.module';
import { AgentRoutingModule } from './agent-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { MyTicketAddComponent } from './my-tickets/my-ticket-add/my-ticket-add.component';
import { MyTicketReplyComponent } from './my-tickets/my-ticket-reply/my-ticket-reply.component';
import { LoginComponent } from './login/login.component';
import { MyVisitRequestsComponent } from './my-visit-requests/my-visit-requests.component';
import { SetVisitDateTimeComponent } from './my-visit-requests/set-visit-date-time/set-visit-date-time.component';
import { ProfileComponent } from './profile/profile.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { AddStatusRequestComponent } from './my-visit-requests/add-status-request/add-status-request.component';
import { PropertyDetailsComponent } from './my-properties/property-details/property-details.component';
import { PropertyEditComponent } from './my-properties/property-edit/property-edit.component';
import { PropertyEditStatusComponent } from './my-properties/property-edit-status/property-edit-status.component';

@NgModule({
  declarations: [
    AgentComponent,
    DashboardComponent,
    MyTicketsComponent,
    MyTicketAddComponent,
    MyTicketReplyComponent,
    LoginComponent,
    MyVisitRequestsComponent,
    SetVisitDateTimeComponent,
    ProfileComponent,
    MyPropertiesComponent,
    AddStatusRequestComponent,
    PropertyDetailsComponent,
    PropertyEditComponent,
    PropertyEditStatusComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule,
    AngularMaterialListModule,
    NgOtpInputModule,
  ],
  entryComponents: [
    MyTicketAddComponent,
    MyTicketReplyComponent,
    SetVisitDateTimeComponent,
    PropertyDetailsComponent,
    PropertyEditComponent,
    PropertyEditStatusComponent
  ],
})
export class AgentModule {}
