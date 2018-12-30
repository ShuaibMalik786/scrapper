import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ScrapperService {
  constructor(private http: HttpClient) {}

  // scrape images
  scrapeUrls(data): Observable<any> {
    const url = `${environment.apiBaseUrl}/scrape/findImages`;
    return this.http
      .post(url, data)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  // request for saving scraped images
  SaveScrapeUrls(data): Observable<any> {
    const url = `${environment.apiBaseUrl}/scrape/save `;
    return this.http
      .post(url, data)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  // get all scrapping names
  getScrapes(): Observable<any> {
    const url = `${environment.apiBaseUrl}/scrape/list `;
    return this.http
      .get(url)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  // get all scrapping names
  getScrape(id: any): Observable<any> {
    const url = `${environment.apiBaseUrl}/scrape/${id} `;
    return this.http
      .get(url)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  public handleError(error: Response) {
    return observableThrowError(error.json());
  }
}
