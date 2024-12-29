import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service permitting to fetch data from an API
@Injectable({
  providedIn: 'root',
})
export class MainMarksService {
  private apiUrl = 'http://localhost:3000'; //base URL of the API

  constructor(private http: HttpClient) { //injection of the HttpClient to handle HTTP requests
  }
  // Fetching of the students with their average marks from the api with the '/students/averages' endpoint
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/averages`);
  }
}
