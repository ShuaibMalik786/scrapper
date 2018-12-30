import { AuthService } from "./../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services";
import { ValidationManager } from "ng2-validation-manager";
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
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
          this.router.navigate(["/"]);
        },
        fail => {
          this.errorMessage = fail.error.message;
          alert("login failed");
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
