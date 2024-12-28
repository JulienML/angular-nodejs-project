
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainMarksService } from '../Services/MainMarksServices';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { catchError, of } from 'rxjs';
//import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
//import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'mainmarks',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule, AgGridModule],
  templateUrl: './mainmarks.component.html',
  styleUrls: ['./mainmarks.component.css']
})

export class MainMarksComponent implements OnInit {
  // Row Data: The data to be displayed.
  rowData: { id: number; name: string; average: number }[] = [];
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, minWidth: 150 },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, minWidth: 200 },
    { headerName: 'Average', field: 'average', sortable: true, filter: true, minWidth: 150 }
  ]

  constructor(private mainmarksService: MainMarksService) {}

  ngOnInit(): void {
    this.mainmarksService
      .getStudents()
      .pipe(
        catchError((error) => {
          console.error('Error fetching student averages:', error);
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data); // Debugging
        this.rowData = data;
      });
  }
}
