import { Component, OnInit } from '@angular/core';
import { AllMarksService } from '../services/AllMarksService';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { catchError, of } from 'rxjs';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'allmarks',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './allmarks.component.html',
  styleUrls: ['./allmarks.component.css'],
})

export class AllMarksComponent implements OnInit {
  rowData: any[] = []; // we will fetch the data of the API to fill rowData
  // column definition and configuration
  columnDefs: ColDef[] = [
    { headerName: 'Student ID', field: 'id_student', sortable: true, filter: true, minWidth: 150 }, //enabling the capacity to filter and sort
    { headerName: 'Student Name', field: 'Student.name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Subject ID', field: 'id_subject', sortable: true, filter: true, minWidth: 150 },
    { headerName: 'Subject Name', field: 'Subject.name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Mark', field: 'mark', sortable: true, filter: true, minWidth: 100 },
  ];

  // injection of the AllMarksService dependency from AllMarksServices.ts
  constructor(private mainMarksService: AllMarksService) {}

  ngOnInit(): void {
    this.mainMarksService
      .getMarks() // fetch of the data from the API (function seen in the corresponding .ts)
      .pipe(
        // handling of errors during API call
        catchError((error) => {
          console.error('Error fetching marks:', error);
          return of([]); // return of an empty array in this case
        })
      )
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data);
        this.rowData = data; // assignement of the fetched data to the grid's rows (rowData)
      });
  }
}
