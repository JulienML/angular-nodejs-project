import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Highcharts from 'highcharts';
import { GradeService } from '../services/grade.service';
import { FormsModule } from '@angular/forms'; // We import all we need at first

@Component({
  selector: 'app-grade-visualization',
  templateUrl: './grade-visualization.component.html', // Link the HTML template
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./grade-visualization.component.css'] // Link to the Style page
})
export class GradeVisualizationComponent implements OnInit {
  selectedStudent: string = ''; // Variable to store the selected student name
  marks: any[] = []; // Array to store marks
  students: any[] = []; // Array to store students

  // We use GradeService to interact with the backend data
  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.gradeService.getStudents().subscribe((data: any[]) => (this.students = data));
    this.gradeService.getMarks().subscribe((marks: any[]) => {
      this.marks = marks; // Store the marks data
      this.loadCharts(marks);
    });
  }

  loadCharts(marks: any[]) {
    // Initialize data structures to group marks by student
    const studentData: { [key: string]: number[] } = {};
    marks.forEach(mark => {
      const studentName = mark.Student.name; // Extract student name
      if (!studentData[studentName]) {
        studentData[studentName] = []; // Initialize an array if the student is not yet added
      }
      studentData[studentName].push(mark.mark); // Add the grade to the student
    });

    // Calculate average grades per student
    const studentCategories = Object.keys(studentData);
    const studentSeriesData = studentCategories.map(studentName => {
      const grades = studentData[studentName];
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length; // Calculate average
    });

    // Same thing as before but we subject not student
    const subjectData: { [key: string]: number[] } = {};
    marks.forEach(mark => {
      const subjectName = mark.Subject.name; // Extract subject name
      if (!subjectData[subjectName]) {
        subjectData[subjectName] = []; // Initialize an array if the subject is not yet added
      }
      subjectData[subjectName].push(mark.mark); // Add the grade to the subject
    });

    // Calculate average grades per subject
    const subjectCategories = Object.keys(subjectData);
    const subjectSeriesData = subjectCategories.map(subjectName => {
      const grades = subjectData[subjectName];
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length; // Calculate average
    });

    // Chart 1: Display average grades by student
    Highcharts.chart('chart-container-students', {
      chart: { type: 'column' }, // Column chart type
      title: { text: 'Average Grades by Student' }, // Chart title
      xAxis: { categories: studentCategories, title: { text: 'Students' } }, // X-axis with student names
      yAxis: { title: { text: 'Average Grade' }, min: 0 }, // Y-axis with grade
      series: [
        {
          name: 'Average Grade',
          data: studentSeriesData,
          type: 'column'
        }
      ]
    });

    // Chart 2: Display average grades by subject
    Highcharts.chart('chart-container-subjects', {
      chart: { type: 'column' }, // Column chart type
      title: { text: 'Average Grades by Subject' }, // Chart title
      xAxis: { categories: subjectCategories, title: { text: 'Subjects' } }, // X-axis with subject names
      yAxis: { title: { text: 'Average Grade' }, min: 0 }, // Y-axis with grade
      series: [
        {
          name: 'Average Grade',
          data: subjectSeriesData, // Data points
          type: 'column'
        }
      ]
    });
  }

  loadStudentChart() {
    // Validate that a student is selected
    if (!this.selectedStudent) {
      alert('Please enter a student name.'); // Alert if no name is provided
      return;
    }

    // Filter marks for the selected student
    const studentMarks = this.marks.filter(mark => mark.Student.name === this.selectedStudent);

    // Check if the selected student has data
    if (studentMarks.length === 0) {
      alert(`No data found for student: ${this.selectedStudent}`); // Also alert if no data is found
      return;
    }

    const categories = studentMarks.map(mark => mark.Subject.name); // Subjects
    const seriesData = studentMarks.map(mark => mark.mark); // Grades

    // Chart 3 : Display grades for the selected student
    Highcharts.chart('chart-container-student-grades', {
      chart: { type: 'line' }, // Line chart type
      title: { text: `Grades for ${this.selectedStudent}` }, // Dynamic chart title based on student name
      xAxis: { categories, title: { text: 'Subjects' } }, // X-axis with subject names
      yAxis: { title: { text: 'Grades' }, min: 0, max: 20 }, // Y-axis with grade
      series: [
        {
          name: `${this.selectedStudent}'s Grades`,
          data: seriesData, // Data points
          type: 'line'
        }
      ]
    });
  }
}
