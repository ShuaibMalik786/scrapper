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

  //scrape images
  scrapeUrls(data): Observable<any> {
    let url = `${environment.apiBaseUrl}/scrape/findImages`;
    return this.http
      .post(url, data)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  //request for saving scraped images
  SaveScrapeUrls(data): Observable<any> {
    let url = `${environment.apiBaseUrl}/scrape/save `;
    return this.http
      .post(url, data)
      .pipe(map(response => response, catchError(this.handleError)));
  }

  public handleError(error: Response) {
    return observableThrowError(error.json());
  }
}
