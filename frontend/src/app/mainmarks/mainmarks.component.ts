import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainMarksService } from '../Services/MainMarksServices';

@Component({
  selector: 'mainmarks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mainmarks.component.html',
  styleUrl: './mainmarks.component.css'
})
export class MainMarksComponent implements OnInit {
  students: { id: number; name: string; average: number }[] = [];

  constructor(private mainmarksService: MainMarksService) {}

  ngOnInit() {
    this.mainmarksService.getStudents().subscribe((data: any[]) => {
      this.students = data.map(student => ({
        id: student.id,
        name: student.name,
        average: student.average
      }));
    });
  }
}

/*
import {Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular'; // Angular Data Grid Component
import {GridApi,GridReadyEvent,ColDef} from 'ag-grid-community';
import {FormsModule} from '@angular/forms';

export class FooModel {
  id!: number;
  name!: string;
  average!: number;
}

class CityModel {
}

@Component({
  selector: 'app-mainmarks',
  standalone: true,
  imports: [AgGridAngular, FormsModule],
  templateUrl: './my.component.html',
})
export class MainMarksComponent implements OnInit {

  private gridApi!: GridApi<CityModel>;

  rows$ = signal(<FooModel[]>[]);


  colDefs: ColDef<FooModel>[] = [
    { headerName: "Id", minWidth: 500,
      // field: "id",
      valueGetter: p => p.data?.id,
    },
    { headerName: "Name", minWidth: 500,
      // field: "name",
      valueGetter: p => p.data?.name,
    },
    { headerName: "Average", minWidth: 500,
      // field: "name",
      valueGetter: p => p.data?.average,
    }
  ];

  onGridReady(params: GridReadyEvent<CityModel>) {
    this.gridApi = params.api;
  }


  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }
  constructor(private http: HttpClientModule) {}
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/students/averages').subscribe(
      (data:any):void => {
        this.rowData = data;
      },
      (error:any):void => {
        console.error('Error fetching student averages:', error);
      }
    );
  }
}




import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-mainmarks',
  standalone: true, // Composant autonome
  imports: [AgGridModule],
  templateUrl: './mainmarks.component.html',
  styleUrls: ['./mainmarks.component.css']
})
export class MainMarksComponent {
  rowData: any[] = [];
  columnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'average', headerName: 'Average', sortable: true, filter: true }
  ];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100
  };

    constructor(private http: HttpClientModule) {}




}
*/
