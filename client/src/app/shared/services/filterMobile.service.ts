import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FilterMobileService {
  constructor(private http: HttpClient) {}



  public handleError(error: Response) {
    return observableThrowError(error.json());
  }
}
