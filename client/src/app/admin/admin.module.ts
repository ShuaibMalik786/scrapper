import { ListScrappersComponent } from './scrapper/list-scrappers/list-scrappers.component';
import { AuthInterceptor } from "./../shared/services/auth.interseptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrapperComponent } from "./scrapper/scrapper.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CreateScrapeComponent } from "./scrapper/create-scrape/create-scrape.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../shared/shared.module";
import { ViewScrapeComponent } from './scrapper/view-scrape/view-scrape.component';
import { FeedHTMLComponent } from './scrapper/feed-html/feed-html.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [
    ScrapperComponent,
    CreateScrapeComponent,
    HomeComponent,
    ProfileComponent,
    ListScrappersComponent,
    ViewScrapeComponent,
    FeedHTMLComponent,
    AddBrandComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMultiSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AdminModule {}
