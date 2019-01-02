import { ScrapperService } from "./../../../shared/services/scrapper.service";
import { Component, OnInit } from "@angular/core";
import { ValidationManager } from "ng2-validation-manager";
import * as _ from "lodash";
import { BrandService } from "src/app/shared/services";

@Component({
  selector: "app-feed-html",
  templateUrl: "./feed-html.component.html",
  styleUrls: ["./feed-html.component.scss"]
})
export class FeedHTMLComponent implements OnInit {
  scrapeUrlForm: any;
  images;
  scrapeSaveForm: any;

  constructor(
    private scrapperService: ScrapperService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.initiateUrlForm();
    this.initiateSaveScrapeForm();
    this.loadBrands();
    // this.getImages();
  }

  startScrape() {
    if (this.scrapeUrlForm.isValid()) {
      this.scrapperService
        .scrapeFeedUrls(this.scrapeUrlForm.getData())
        .subscribe(
          success => {
            console.log(success);
            this.images = success.data;
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
      url: this.scrapeSaveForm.getValue("url"),
      brand: this.scrapeSaveForm.getValue("brand"),
      frontCamera: this.scrapeSaveForm.getValue("frontCamera"),
      backCamera: this.scrapeSaveForm.getValue("backCamera"),
      images: this.images
    };
    if (this.scrapeSaveForm.isValid()) {
      this.scrapperService.SaveScrapeUrls(data).subscribe(
        success => {
          console.log(success);
        },
        fail => {
          console.log(fail.error);
        }
      );
    }
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(
      success => {
        console.log(success);
      },
      fail => {
        console.log(fail.error);
      }
    );
  }

  initiateUrlForm() {
    this.scrapeUrlForm = new ValidationManager({
      html: "required"
    });
  }

  initiateSaveScrapeForm() {
    this.scrapeSaveForm = new ValidationManager({
      name: "required|minLength:5|maxLength:100",
      url: "required|minLength:5",
      brand: "required|maxLength:255",
      frontCamera: "required|maxLength:3",
      backCamera: "required|maxLength:3"
    });
  }
}
