import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { MainMarksService } from '../services/MainMarksServices';
import { catchError, of } from 'rxjs';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]); // Register all community modules
@Component({
  selector: 'mainmarks',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './mainmarks.component.html',
  styleUrls: ['./mainmarks.component.css']
})

export class MainMarksComponent implements OnInit {
  rowData: { id: number; name: string; average: number }[] = []; // we will fetch the data of the API to fill rowData
  // column definition and configuration
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, minWidth: 150 }, //enabling the capacity to filter and sort
    { headerName: 'Name', field: 'name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Average', field: 'average', sortable: true, filter: true, minWidth: 150 }
  ]

  // injection of the AllMarksService dependency from MainMarksServices.ts
  constructor(private mainmarksService: MainMarksService) {}

  ngOnInit(): void {
    this.mainmarksService
      .getStudents() // fetch of the data from the API (function seen in the corresponding .ts)
      .pipe(
        // handling of errors during API call
        catchError((error) => {
          console.error('Error fetching student averages:', error);
          return of([]); // return an empty array in this case
        })
      )
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data);
        this.rowData = data; // assigning of the fetched data to the grid's rows (rowData)
      });
  }
}
