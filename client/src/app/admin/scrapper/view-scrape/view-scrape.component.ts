import { ActivatedRoute } from "@angular/router";
import { ScrapperService } from "./../../../shared/services/scrapper.service";
import { Component, OnInit } from "@angular/core";
declare let $: any;

@Component({
  selector: "app-view-scrape",
  templateUrl: "./view-scrape.component.html",
  styleUrls: ["./view-scrape.component.scss"]
})
export class ViewScrapeComponent implements OnInit {
  scrape: any;
  scrapeId: any;
  largeImage: any;

  constructor(
    private scrapperService: ScrapperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.scrapeId = params["id"]; //log the value of id
    });
    this.loadScrape();
  }

  loadScrape() {
    this.scrapperService.getScrape(this.scrapeId).subscribe(
      success => {
        console.log(success);
        this.scrape = success.data;
      },
      fail => {
        console.log(fail.error);
        alert("failed to load scrapes list");
      }
    );
  }

  openImage(url: string) {
    this.largeImage = url;
    $('#imageModal').modal('show');
  }
}
