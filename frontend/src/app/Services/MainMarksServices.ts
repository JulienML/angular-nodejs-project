import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainMarksService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }
  // Students
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/averages`);
  }
}
