import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialListModule } from './../angular-material-list.module';
import { PrimengListModule } from './../primeng-list.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MobileHeaderComponent } from './shared/header/mobile-header/mobile-header.component';
import { PcHeaderComponent } from './shared/header/pc-header/pc-header.component';
import { MobileTopHeaderComponent } from './shared/header/mobile-top-header/mobile-top-header.component';
import { PcTopHeaderComponent } from './shared/header/pc-top-header/pc-top-header.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import { LayoutRoutingModule } from './layout-routing.module';
import {RatingModule} from 'primeng/rating';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { LayoutComponent } from './layout.component';
import { HomeSearchComponent } from './home/home-search/home-search.component';
import { HomeGoalComponent } from './home/home-goal/home-goal.component';
import { HomeServicesComponent } from './home/home-services/home-services.component';
import { HomePropertiesComponent } from './home/home-properties/home-properties.component';
import { HomeAgentsComponent } from './home/home-agents/home-agents.component';
import { HomeNewsComponent } from './home/home-news/home-news.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { AuthComponent } from './auth/auth.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HomeBannerComponent,
    HeaderComponent,
    PcTopHeaderComponent,
    MobileTopHeaderComponent,
    PcHeaderComponent,
    MobileHeaderComponent,
    FooterComponent,
    HomeSearchComponent,
    HomeGoalComponent,
    HomeServicesComponent,
    HomePropertiesComponent,
    HomeAgentsComponent,
    HomeNewsComponent,
    PropertiesComponent,
    PropertyDetailsComponent,
    AgentsComponent,
    AgentDetailsComponent,
    FaqsComponent,
    TermsComponent,
    ContactComponent,
    AboutComponent,
    NewsComponent,
    NewsDetailComponent,
    AuthComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgOtpInputModule,
    PrimengListModule,
    AngularMaterialListModule,
    NgxPaginationModule,
    BreadcrumbModule,
    RatingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayoutModule { }
