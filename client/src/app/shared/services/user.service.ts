import { Injectable } from "@angular/core";
import {
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private router: Router) {}

  //logs out in user
  logout(): any {
    // localStorage.removeItem("token");
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
}
