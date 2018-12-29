import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzI1ZTMyZDdmYzFmNjJjZjhhZmRjNGEiLCJpYXQiOjE1NDU5ODgwMTd9.JojymmYSEE5sAB8jjuhIOS8wy1an32RhWWGCF6pPDqo';

  login(data): Observable<any> {
    return this.http.post("http://localhost:3030/api/auth", data).pipe(
      map(response => response,
      catchError(this.handleError)
    ));
  }

  public handleError(error: Response) {
    return observableThrowError(error.json());
  }

}
