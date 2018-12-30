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

@NgModule({
  declarations: [
    ScrapperComponent,
    CreateScrapeComponent,
    HomeComponent,
    ProfileComponent,
    ListScrappersComponent,
    ViewScrapeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
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
