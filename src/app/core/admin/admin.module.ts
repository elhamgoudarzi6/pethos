import { AngularMaterialListModule } from './../../angular-material-list.module';
import { PrimengListModule } from './../../primeng-list.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorAddComponent } from './administrators/administrator-add/administrator-add.component';
import { AdministratorEditComponent } from './administrators/administrator-edit/administrator-edit.component';
import { AdministratorDetailsComponent } from './administrators/administrator-details/administrator-details.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqAddComponent } from './faqs/faq-add/faq-add.component';
import { FaqEditComponent } from './faqs/faq-edit/faq-edit.component';
import { FaqDetailsComponent } from './faqs/faq-details/faq-details.component';
import { NewsComponent } from './news/news.component';
import { NewsAddComponent } from './news/news-add/news-add.component';
import { NewsEditComponent } from './news/news-edit/news-edit.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { SlidersComponent } from './sliders/sliders.component';
import { SliderAddComponent } from './sliders/slider-add/slider-add.component';
import { SliderEditComponent } from './sliders/slider-edit/slider-edit.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountAddComponent } from './discounts/discount-add/discount-add.component';
import { DiscountEditComponent } from './discounts/discount-edit/discount-edit.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentAddComponent } from './agents/agent-add/agent-add.component';
import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentDetailsComponent } from './agents/agent-details/agent-details.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { PropertyTypeAddComponent } from './property-types/property-type-add/property-type-add.component';
import { PropertyTypeEditComponent } from './property-types/property-type-edit/property-type-edit.component';
import { SubPropertyTypeAddComponent } from './property-types/sub-property-type-add/sub-property-type-add.component';
import { SubPropertyTypeEditComponent } from './property-types/sub-property-type-edit/sub-property-type-edit.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyAddComponent } from './properties/property-add/property-add.component';
import { PropertyEditComponent } from './properties/property-edit/property-edit.component';
import { PropertyDetailsComponent } from './properties/property-details/property-details.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketReplyComponent } from './tickets/ticket-reply/ticket-reply.component';
import { LoginComponent } from './login/login.component';
import { VisitRequestsComponent } from './visit-requests/visit-requests.component';
import { AdministratorSecurityComponent } from './administrators/administrator-security/administrator-security.component';
import { SetVisitDateTimeComponent } from './visit-requests/set-visit-date-time/set-visit-date-time.component';
import { AddStatusRequestComponent } from './visit-requests/add-status-request/add-status-request.component';
import { PropertyEditStatusComponent } from './properties/property-edit-status/property-edit-status.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailsComponent,
    AdministratorsComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    FaqsComponent,
    FaqAddComponent,
    FaqEditComponent,
    FaqDetailsComponent,
    NewsComponent,
    NewsAddComponent,
    NewsEditComponent,
    NewsDetailsComponent,
    SlidersComponent,
    SliderAddComponent,
    SliderEditComponent,
    SubscriptionsComponent,
    DiscountsComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    AgentsComponent,
    AgentAddComponent,
    AgentEditComponent,
    AgentDetailsComponent,
    PropertyTypesComponent,
    PropertyTypeAddComponent,
    PropertyTypeEditComponent,
    SubPropertyTypeAddComponent,
    SubPropertyTypeEditComponent,
    PropertiesComponent,
    PropertyAddComponent,
    PropertyEditComponent,
    PropertyDetailsComponent,
    ContactMessagesComponent,
    TicketsComponent,
    TicketReplyComponent,
    LoginComponent,
    VisitRequestsComponent,
    AdministratorSecurityComponent,
    SetVisitDateTimeComponent,
    AddStatusRequestComponent,
    PropertyEditStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule,
    AngularMaterialListModule,
  ],
  entryComponents: [
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    AdministratorSecurityComponent,
    AgentAddComponent,
    AgentEditComponent,
    AgentDetailsComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    FaqAddComponent,
    FaqEditComponent,
    FaqDetailsComponent,
    NewsAddComponent,
    NewsEditComponent,
    NewsDetailsComponent,
    SliderAddComponent,
    SliderEditComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailsComponent,
    PropertyTypeAddComponent,
    PropertyTypeEditComponent,
    SubPropertyTypeAddComponent,
    SubPropertyTypeEditComponent,
    PropertyAddComponent,
    PropertyEditComponent,
    PropertyDetailsComponent,
    TicketReplyComponent,
    SetVisitDateTimeComponent,
    AddStatusRequestComponent,
    PropertyEditStatusComponent
  ],
})
export class AdminModule {}
