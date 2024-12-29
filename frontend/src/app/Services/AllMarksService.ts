import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllMarksService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }
  // Students
  getMarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/marks`);
  }
}
