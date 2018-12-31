import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { ScrapperService } from "src/app/shared/services";

@Component({
  selector: "app-list-scrappers",
  templateUrl: "./list-scrappers.component.html",
  styleUrls: ["./list-scrappers.component.scss"]
})
export class ListScrappersComponent implements OnInit {
  scrapes: any;
  constructor(
    private scrapperService: ScrapperService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadScrapesList();
  }

  loadScrapesList() {
    this.scrapperService.getScrapes().subscribe(
      success => {
        console.log(success);
        this.scrapes = success.data;
      },
      fail => {
        console.log(fail.error);
        alert("failed to load scrapes list");
      }
    );
  }

  deleteScrape(id: any) {
    this.scrapperService.deleteScrape(id).subscribe(
      success => {
        console.log(success);
        this.scrapes = success.data;
      },
      fail => {
        console.log(fail.error);
        alert("failed to delete scrape");
      }
    );
  }

  loadScrape(id) {
    this.router.navigate(["/admin/view", id]);
  }
}
