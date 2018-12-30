import { ScrapperService } from "./../../../shared/services/scrapper.service";
import { Component, OnInit } from "@angular/core";
import { ValidationManager } from "ng2-validation-manager";
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-create-scrape",
  templateUrl: "./create-scrape.component.html",
  styleUrls: ["./create-scrape.component.scss"]
})
export class CreateScrapeComponent implements OnInit {
  scrapeUrlForm: any;
  images;
  scrapeSaveForm: any;

  constructor(private scrapperService: ScrapperService) {}

  ngOnInit() {
    this.initiateUrlForm();
    this.initiateSaveScrapeForm();
    // this.getImages();
  }

  startScrape() {
    if (this.scrapeUrlForm.isValid()) {
      this.scrapperService.scrapeUrls(this.scrapeUrlForm.getData()).subscribe(
        success => {
          console.log(success);
          this.images = success.data;
          console.log(this.images);
        },
        fail => {
          console.log(fail.error);
        }
      );
    }
  }

  saveScrape() {
    let data = {
      name: this.scrapeSaveForm.getValue("name"),
      images: this.images
    };
    if (this.scrapeSaveForm.isValid()) {
      this.scrapperService
        .SaveScrapeUrls(data)
        .subscribe(
          success => {
            console.log(success);
          },
          fail => {
            console.log(fail.error);
          }
        );
    }
  }

  initiateUrlForm() {
    this.scrapeUrlForm = new ValidationManager({
      url: "required|minLength:5|maxLength:1000"
    });
  }

  initiateSaveScrapeForm() {
    this.scrapeSaveForm = new ValidationManager({
      name: "required|minLength:5|maxLength:100"
    });
  }
}
