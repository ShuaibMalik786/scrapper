import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { LoginService, AuthInterceptor, SignupService } from "./services/index";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService, SignupService, AuthInterceptor]
})
export class SharedModule {}
