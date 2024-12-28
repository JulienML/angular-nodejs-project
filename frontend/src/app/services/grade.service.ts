import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Students
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  addStudent(student: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  // Subjects
  getSubjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subjects`);
  }

  addSubject(subject: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/subjects`, subject);
  }

  // Marks
  getMarks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/marks`);
  }

  addMark(mark: { id_student: number; id_subject: number; mark: number; coefficient?: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/marks`, mark);
  }

  updateMark(id: number, mark: { mark: number; coefficient?: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/marks/${id}`, mark);
  }

  deleteMark(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/marks/${id}`);
  }
}
