import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-grade-visualization',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './grade-visualization.component.html',
  styleUrls: ['./grade-visualization.component.css']
})
export class GradeVisualizationComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // Référence à Highcharts
  chartOptions: Highcharts.Options = {}; // Options du graphique
  updateFlag = false; // Flag pour forcer la mise à jour du graphique

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.gradeService.getMarks().subscribe((marks: any[]) => {
      console.log('Marks received:', marks); // Vérifie les données reçues
      this.loadChartData(marks);
    });
  }

  loadChartData(marks: any[]) {
    const studentData: { [key: string]: number[] } = {};

    marks.forEach(mark => {
      const studentName = mark.Student.name;
      if (!studentData[studentName]) {
        studentData[studentName] = [];
      }
      studentData[studentName].push(mark.mark);
    });

    const categories = Object.keys(studentData);
    const seriesData = categories.map(studentName => {
      const grades = studentData[studentName];
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    });

    console.log('Categories:', categories);
    console.log('Series Data:', seriesData);

    // Utilise directement Highcharts.chart pour dessiner le graphique
    Highcharts.chart('chart-container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Student Mean Overall'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Students'
        }
      },
      yAxis: {
        title: {
          text: 'Average Grade'
        },
        min: 0
      },
      series: [
        {
          name: 'Average Grade',
          data: seriesData,
          type: 'column'
        }
      ]
    });
  }

}
