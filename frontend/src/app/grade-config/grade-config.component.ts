import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../Services/grade.service';

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
  studentToRemove = 0;
  newSubjectName = '';
  subjectToRemove = 0;
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
    this.gradeService.getMarks().subscribe((data: any[]) => {
      this.grades = data.map(grade => ({ ...grade, isEditing: false }));
    });
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

  // Remove a student
  // We call the grade.service.ts file to delete a student from the database
  // and then we load the data again to refresh the display below
  removeStudent(id: number) {
    this.gradeService.deleteStudent(id).subscribe(() => {
      this.loadData(); // Refresh data
    });
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

  // Remove a subject
  // We call the grade.service.ts file to delete a subject from the database
  // and then we load the data again to refresh the display below
  removeSubject(id: number) {
    this.gradeService.deleteSubject(id).subscribe(() => {
      this.loadData(); // Refresh data
    });
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

  // Edit a grade
  // We set the isEditing property to true to allow the user to edit the grade (show the form)
  editGrade(grade: any) {
    grade.isEditing = true;
  }

  // Cancel editing a grade
  // We set the isEditing property to false to prevent the user from editing the grade (hide the form)
  cancelEdit(grade: any) {
    grade.isEditing = false;
  }

  // Update an existing grade
  // We call the grade.service.ts file to update and already existing grade from the database
  // and the we load the data again to refresh the display below
  updateGrade(grade: any) {
    grade.isEditing = false;
    console.log(grade);
    const { id, mark, coefficient } = grade;
    const updatedMark = { mark, coefficient };
    this.gradeService.updateMark(id, updatedMark).subscribe(() => {
      const index = this.grades.findIndex(g => g.id === id);
      if (index !== -1) {
        this.grades[index] = { ...this.grades[index], mark, coefficient };
      }
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
