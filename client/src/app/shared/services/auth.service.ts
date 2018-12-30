import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}


  isLoggedIn(): any {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else return true;
  }

  isAdmin(): any {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        console.log(jwt_decode(token));
        if (jwt_decode(token).isAdmin == true) {
          return true;
        } else return false;
      } catch (Error) {
        return null;
      }
    }
  }
}
