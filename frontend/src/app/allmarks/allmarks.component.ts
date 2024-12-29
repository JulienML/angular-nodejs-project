import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AllMarksService } from '../Services/AllMarksService';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { catchError, of } from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'allmarks',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule],
  templateUrl: './allmarks.component.html',
  styleUrls: ['./allmarks.component.css'],
})
export class AllMarksComponent implements OnInit {
  rowData: any[] = []; // The data for the grid
  columnDefs: ColDef[] = [
    { headerName: 'Student ID', field: 'id_student', sortable: true, filter: true, minWidth: 150 },
    { headerName: 'Student Name', field: 'Student.name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Subject ID', field: 'id_subject', sortable: true, filter: true, minWidth: 150 },
    { headerName: 'Subject Name', field: 'Subject.name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Mark', field: 'mark', sortable: true, filter: true, minWidth: 100 },
  ];

  constructor(private mainMarksService: AllMarksService) {}

  ngOnInit(): void {
    this.mainMarksService
      .getMarks()
      .pipe(
        catchError((error) => {
          console.error('Error fetching marks:', error);
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data); // Debugging
        this.rowData = data;
      });
  }
}
