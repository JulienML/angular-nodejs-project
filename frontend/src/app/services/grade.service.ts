import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  // Link to the backend for API calls
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Students
  // API to fetch all existant students from the database
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  // API to add a new student to the database
  addStudent(student: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  // API to delete an already existant student from the database
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }

  // Subjects
  // API to fetch all existant subjects from the database
  getSubjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subjects`);
  }

  // API to add a new subject to the database
  addSubject(subject: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/subjects`, subject);
  }

  // API to delete an already existant subject from the database
  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subjects/${id}`);
  }

  // Marks
  // API to fetch all the existant marks from the database
  getMarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/marks`);
  }

  // API to add a new mark to the database
  addMark(mark: { id_student: number; id_subject: number; mark: number; coefficient?: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/marks`, mark);
  }

  // API to update (modify) an already existant mark from the display below the form
  updateMark(id: number, mark: { mark: number; coefficient?: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/marks/${id}`, mark);
  }

  // API to delete an already existant mark from the display below the form
  deleteMark(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/marks/${id}`);
  }
}
