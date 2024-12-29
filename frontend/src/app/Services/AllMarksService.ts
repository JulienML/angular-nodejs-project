import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// service permitting to fetch data from an API
@Injectable({
  providedIn: 'root',
})
export class AllMarksService {
  private apiUrl = 'http://localhost:3000'; // base URL of the API

  constructor(private http: HttpClient) {} // injection of the HttpClient to handle HTTP requests
  // fetching of the marks data from the api with the '/marks' endpoint
  getMarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/marks`);
  }
}
