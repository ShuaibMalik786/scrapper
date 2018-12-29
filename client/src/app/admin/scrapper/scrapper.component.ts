import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-scrapper",
  templateUrl: "./scrapper.component.html",
  styleUrls: ["./scrapper.component.scss"]
})
export class ScrapperComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.getImages();
  }

  getImages() {}
}
