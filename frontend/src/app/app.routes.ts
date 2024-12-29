import { Routes } from '@angular/router';
import { GradeConfigComponent } from './grade-config/grade-config.component';
import { GradeVisualizationComponent } from './grade-visualization/grade-visualization.component';
import { MainMarksComponent } from './mainmarks/mainmarks.component';
import { AllMarksComponent } from './allmarks/allmarks.component';

export const routes: Routes = [
  { path: 'grade-config', component: GradeConfigComponent },
  { path: 'charts', redirectTo: 'grade-visualization', pathMatch: 'full' },
  { path: 'grade-visualization', component: GradeVisualizationComponent },
  { path: '', redirectTo: '/mainmarks', pathMatch: 'full' },
  { path: 'mainmarks', component: MainMarksComponent },
  { path: 'all-marks', component: AllMarksComponent }
];
