import { AuthService } from "./../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services";
import { ValidationManager } from "ng2-validation-manager";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm;
  errorMessage: string;

  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initiateLoginForm();
  }

  loginUser() {
    if (this.loginForm.isValid()) {
      this.loginService.login(this.loginForm.getData()).subscribe(
        success => {
          console.log(success);
          localStorage.setItem("token", success.data.token);
          // alert('userlogged in successfully');
          console.log(this.authService.isLoggedIn());
        },
        fail => {
          this.errorMessage = fail.error.message;
          console.log(fail.error);
        }
      );
    }
  }

  initiateLoginForm() {
    this.loginForm = new ValidationManager({
      email: "",
      password: ""
    });
  }
}
