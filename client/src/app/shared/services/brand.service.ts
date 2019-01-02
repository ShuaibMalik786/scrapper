import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class BrandService {
  constructor(private http: HttpClient) {}

  // get brands
  getBrands(): Observable<any> {
    const url = `${environment.apiBaseUrl}/brand `;
    return this.http
      .get(url)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  // saving images scraped
  SaveScrapeUrls(data): Observable<any> {
    const url = `${environment.apiBaseUrl}/brand/add `;
    return this.http
      .post(url, data)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  public handleError(error: Response) {
    return observableThrowError(error.json());
  }
}
