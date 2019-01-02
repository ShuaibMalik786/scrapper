import { Component, OnInit } from "@angular/core";
import { ValidationManager } from "ng2-validation-manager";
import { BrandService } from "src/app/shared/services";

@Component({
  selector: "app-add-brand",
  templateUrl: "./add-brand.component.html",
  styleUrls: ["./add-brand.component.scss"]
})
export class AddBrandComponent implements OnInit {
  addBrandForm: any;

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.initiateBrandForm();
  }

  saveBrand() {
    if (this.addBrandForm.isValid()) {
      this.brandService.SaveScrapeUrls(this.addBrandForm.getData()).subscribe(
        success => {
          console.log(success);
          alert('brand addd successfuly');
        },
        fail => {
          console.log(fail.error);
          alert('failed to add brand');

        }
      );
    }
  }

  initiateBrandForm() {
    this.addBrandForm = new ValidationManager({
      name: "required|minLength:2|maxLength:255"
    });
  }
}
