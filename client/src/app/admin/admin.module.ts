import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrapperComponent } from "./scrapper/scrapper.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
  declarations: [ScrapperComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
