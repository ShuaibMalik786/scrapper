import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "./shared/services";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SignupComponent } from "./signup/signup.component";
import { GenresComponent } from "./genres/genres.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GenresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
