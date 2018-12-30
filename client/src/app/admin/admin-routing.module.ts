import { AdminGuard } from './../shared/_guards/admin.guard';
import { CreateScrapeComponent } from "./scrapper/create-scrape/create-scrape.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ScrapperComponent } from "./scrapper/scrapper.component";

const routes: Routes = [
  {
    path: "",
    component: ScrapperComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "create",
    component: CreateScrapeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule {}
