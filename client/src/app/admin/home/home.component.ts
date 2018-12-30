import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  logOut() {
    this.userService.logout();
  }
}
