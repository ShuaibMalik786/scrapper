import { Component, OnInit } from "@angular/core";
import { ScrapperService, BrandService } from "src/app/shared/services";
import { ValidationManager } from "ng2-validation-manager";
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized
} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: "app-list-scrappers",
  templateUrl: "./list-scrappers.component.html",
  styleUrls: ["./list-scrappers.component.scss"]
})
export class ListScrappersComponent implements OnInit {
  scrapes: any;
  brandList: any;
  filterMobileForm: any;
  params: any;

  constructor(
    private scrapperService: ScrapperService,
    private router: Router,
    private brandService: BrandService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initiateFilterForm();
    this.loadScrapesList();
    this.loadBrandList();
    this.subscribeToUrlChange();
  }

  initiateFilterForm() {
    this.filterMobileForm = new ValidationManager({
      brand: "maxLength:255",
      frontCamera: "maxLength:3",
      backCamera: "maxLength:3",
    });
  }

  loadBrandList() {
    this.brandService.getBrands().subscribe(
      success => {
        console.log(success);
        this.brandList = success.data;
      },
      fail => {
        console.log(fail.error);
      }
    );
  }

  loadScrapesList() {
    this.scrapperService.getScrapes(this.params).subscribe(
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

  // Go to scrape page
  loadScrape(id) {
    this.router.navigate(["/admin/view", id]);
  }

  // Filter process
  subscribeToUrlChange() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      this.loadScrapesList();
    });
  }

  applyFilter() {
    let params = this.filterMobileForm.getData();
    for (var propName in params) {
      if (params[propName] == "any") {
        delete params[propName];
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params
    });
  }

  clearFilters() {
    this.initiateFilterForm();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
