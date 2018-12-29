import { Component, OnInit } from "@angular/core";
import { ValidationManager } from "ng2-validation-manager";
import { SignupService } from "../shared/services";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signupForm;
  errorMessage: string;

  constructor(private signupService: SignupService) {}

  ngOnInit() {
    this.initiateSignForm();
  }

  loginUser() {
    if (this.signupForm.isValid()) {
      this.signupService.signup(this.signupForm.getData()).subscribe(
        success => {
          console.log(success);
          localStorage.setItem("token", success.data.token);
          alert('user registered successfully');
        },
        fail => {
          this.errorMessage = fail.error.errorMessage;
          console.log(fail.error);
        }
      );
    }
  }

  initiateSignForm() {
    this.signupForm = new ValidationManager({
      name: "required|minLength:5|maxLength:50",
      email: "required|email|minLength:5|maxLength:255",
      password: "required|minLength:5|maxLength:255"
    });
  }
}
