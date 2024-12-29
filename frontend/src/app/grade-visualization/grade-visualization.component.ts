import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { GradeService } from '../Services/grade.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-grade-visualization',
  templateUrl: './grade-visualization.component.html',
  standalone: true,
  imports : [FormsModule],
  styleUrls: ['./grade-visualization.component.css']
})
export class GradeVisualizationComponent implements OnInit {
  selectedStudent: string = ''; // Nom de l'étudiant sélectionné
  marks: any[] = []; // Stocker les données des notes

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    // Charger toutes les données des notes
    this.gradeService.getMarks().subscribe((marks: any[]) => {
      this.marks = marks;
      this.loadCharts(marks); // Charger les deux premiers graphiques
    });
  }

  loadCharts(marks: any[]) {
    // Graphique 1 : Moyennes par étudiant
    const studentData: { [key: string]: number[] } = {};
    marks.forEach(mark => {
      const studentName = mark.Student.name;
      if (!studentData[studentName]) {
        studentData[studentName] = [];
      }
      studentData[studentName].push(mark.mark);
    });

    const studentCategories = Object.keys(studentData);
    const studentSeriesData = studentCategories.map(studentName => {
      const grades = studentData[studentName];
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    });

    // Graphique 2 : Moyennes par matière
    const subjectData: { [key: string]: number[] } = {};
    marks.forEach(mark => {
      const subjectName = mark.Subject.name;
      if (!subjectData[subjectName]) {
        subjectData[subjectName] = [];
      }
      subjectData[subjectName].push(mark.mark);
    });

    const subjectCategories = Object.keys(subjectData);
    const subjectSeriesData = subjectCategories.map(subjectName => {
      const grades = subjectData[subjectName];
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    });

    // Graphique 1 : Moyennes par étudiant
    Highcharts.chart('chart-container-students', {
      chart: { type: 'column' },
      title: { text: 'Average Grades by Student' },
      xAxis: { categories: studentCategories, title: { text: 'Students' } },
      yAxis: { title: { text: 'Average Grade' }, min: 0 },
      series: [
        {
          name: 'Average Grade',
          data: studentSeriesData,
          type: 'column'
        }
      ]
    });

    // Graphique 2 : Moyennes par matière
    Highcharts.chart('chart-container-subjects', {
      chart: { type: 'column' },
      title: { text: 'Average Grades by Subject' },
      xAxis: { categories: subjectCategories, title: { text: 'Subjects' } },
      yAxis: { title: { text: 'Average Grade' }, min: 0 },
      series: [
        {
          name: 'Average Grade',
          data: subjectSeriesData,
          type: 'column'
        }
      ]
    });
  }

  loadStudentChart() {
    if (!this.selectedStudent) {
      alert('Please enter a student name.');
      return;
    }

    // Trouver les notes pour l'étudiant sélectionné
    const studentMarks = this.marks.filter(mark => mark.Student.name === this.selectedStudent);

    if (studentMarks.length === 0) {
      alert(`No data found for student: ${this.selectedStudent}`);
      return;
    }

    const categories = studentMarks.map(mark => mark.Subject.name); // Matières
    const seriesData = studentMarks.map(mark => mark.mark); // Notes

    // Graphique pour l'étudiant sélectionné
    Highcharts.chart('chart-container-student-grades', {
      chart: { type: 'line' },
      title: { text: `Grades for ${this.selectedStudent}` },
      xAxis: { categories, title: { text: 'Subjects' } },
      yAxis: { title: { text: 'Grades' }, min: 0, max: 20 },
      series: [
        {
          name: `${this.selectedStudent}'s Grades`,
          data: seriesData,
          type: 'line'
        }
      ]
    });
  }
}
