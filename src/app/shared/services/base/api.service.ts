import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint: string;
  headers: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.endpoint = 'https://localhost:7277/api';
  }

  private setHeaders() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    const token = this.cookieService.get('accessToken');

    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.set('Authorization', tokenValue);
    }
  }

  setParams(parameters: any) {
    let params = new HttpParams();
    if (parameters) {
      for (const i in parameters) {
        if (parameters[i] != null) {
          params = params.append(i, parameters[i]);
        }
      }
    }
    return params;
  }

  get(url: string, parameters?: any): Observable<any> {
    this.setHeaders();
    const params = this.setParams(parameters);
    return this.http.get<any>(`${this.endpoint}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  post(url: string, data: any, parameters?: any): Observable<any> {
    this.setHeaders();
    return this.http.post<any>(`${this.endpoint}/${url}`, data, {
      headers: this.headers,
    });
  }

  put(url: string, data: any): Observable<any> {
    this.setHeaders();
    return this.http.put<any>(`${this.endpoint}/${url}`, data, {
      headers: this.headers,
    });
  }

  delete(url: string, objectId: string): Observable<any> {
    this.setHeaders();
    return this.http.delete<any>(`${this.endpoint}/${url}/${objectId}`, {
      headers: this.headers,
    });
  }
}
