import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const url = environment.api

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient) { }
  get(queryParams = {}): Observable<any> {
      return this.http.get<any>(url + 'metadata', { params: queryParams });
  }
}
