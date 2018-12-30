import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrapperComponent } from "./scrapper/scrapper.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CreateScrapeComponent } from "./scrapper/create-scrape/create-scrape.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ScrapperComponent, CreateScrapeComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule]
})
export class AdminModule {}
