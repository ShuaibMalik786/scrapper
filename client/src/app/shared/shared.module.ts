import { AdminGuard } from "./_guards/admin.guard";
import { AuthGuard } from "./_guards/auth.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import {
  LoginService,
  AuthInterceptor,
  SignupService,
  ScrapperService,
  UserService,
  BrandService
} from "./services/index";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    LoginService,
    SignupService,
    ScrapperService,
    UserService,
    AuthInterceptor,
    AuthGuard,
    AdminGuard,
    BrandService
  ]
})
export class SharedModule {}
