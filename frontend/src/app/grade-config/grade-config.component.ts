import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-grade-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grade-config.component.html',
  styleUrl: './grade-config.component.css'
})

export class GradeConfigComponent implements OnInit {
  students: any[] = [];
  subjects: any[] = [];
  grades: any[] = [];
  newStudentName = '';
  newSubjectName = '';
  newGrade = { id_student: 0, id_subject: 0, mark: 0, coefficient: 1 };

  constructor(private gradeService: GradeService) {}

  // Call the loadData function to create the display of grades below the form
  ngOnInit() {
    this.loadData();
  }

  // Load data from the backend
  // Using the grade.service.ts component we fetch every student, subjects and mark from the database
  loadData() {
    this.gradeService.getStudents().subscribe((data: any[]) => (this.students = data));
    this.gradeService.getSubjects().subscribe((data: any[]) => (this.subjects = data));
    this.gradeService.getMarks().subscribe((data: any[]) => (this.grades = data));
  }
  

  // Add a new student
  // We call the grade.service.ts file to add a new student in the database
  // and then we load the data again to refresh the display below
  addStudent() {
    if (this.newStudentName.trim()) {
      this.gradeService.addStudent({ name: this.newStudentName }).subscribe(() => {
        this.loadData(); // Refresh data
        this.newStudentName = '';
      });
    }
  }

  // Add a new subject
  // We call the grade.service.ts file to add a new subject in the database
  // and then we load the data again to refresh the display below
  addSubject() {
    if (this.newSubjectName.trim()) {
      this.gradeService.addSubject({ name: this.newSubjectName }).subscribe(() => {
        this.loadData(); // Refresh data
        this.newSubjectName = '';
      });
    }
  }

  // Add a new grade
  // We call the grade.service.ts file to add a new mark in the database
  // and then we load the data again to refresh the display below
  addGrade() {
    const { id_student, id_subject, mark, coefficient } = this.newGrade;
    if (id_student && id_subject && mark >= 0) {
      this.gradeService.addMark({ id_student, id_subject, mark, coefficient }).subscribe(() => {
        this.loadData(); // Refresh data
        this.newGrade = { id_student: 0, id_subject: 0, mark: 0, coefficient: 1 };
      });
    }
  }

  // Update an existing grade
  // We call the grade.service.ts file to update and already existing grade from the database
  // and the we load the data again to refresh the display below
  updateGrade(grade: any) {
    const updatedMark = { mark: grade.mark, coefficient: grade.coefficient };
    this.gradeService.updateMark(grade.id, updatedMark).subscribe(() => {
      this.loadData(); // Refresh data
    });
  }

  // Delete a grade
  // We call the grade.service.ts file to delete and already existing grade from the database
  // and then we load the data again to refresh the display below
  deleteGrade(id: number) {
    this.gradeService.deleteMark(id).subscribe(() => {
      this.loadData(); // Refresh data
    });
  }
}
