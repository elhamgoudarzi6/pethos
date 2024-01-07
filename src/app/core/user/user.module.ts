import { VisitRequestsComponent } from './visit-requests/visit-requests.component';
import { PropertyAddComponent } from './properties/property-add/property-add.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AngularMaterialListModule } from './../../angular-material-list.module';
import { PrimengListModule } from './../../primeng-list.module';
import { UserRoutingModule } from './user-routing.module';
import {NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketAddComponent } from './tickets/ticket-add/ticket-add.component';
import { TicketReplyComponent } from './tickets/ticket-reply/ticket-reply.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyEditComponent } from './properties/property-edit/property-edit.component';
import { PropertyDetailsComponent } from './properties/property-details/property-details.component';
import { StatusRequestComponent } from './visit-requests/status-request/status-request.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    VisitRequestsComponent,
    TicketsComponent,
    TicketAddComponent,
    TicketReplyComponent,
    PropertiesComponent,
    PropertyAddComponent,
    PropertyEditComponent,
    PropertyDetailsComponent,
    StatusRequestComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    PrimengListModule,
    AngularMaterialListModule,
  ],
  entryComponents: [
    PropertyAddComponent,
    PropertyEditComponent,
    PropertyDetailsComponent,
    TicketAddComponent,
    TicketReplyComponent,
    StatusRequestComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
