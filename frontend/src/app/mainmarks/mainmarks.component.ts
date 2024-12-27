import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importer CommonModule pour les directives comme ngIf
import { AgGridModule } from 'ag-grid-angular';  // Importer AgGridModule
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, GridOptions } from 'ag-grid-community';  // Si nécessaire pour vos colonnes ou options de la grille

@Component({
  selector: 'app-mainmarks',
  standalone: true,
  imports: [AgGridModule, CommonModule],
  templateUrl: './mainmarks.component.html',
  styleUrls: ['./mainmarks.component.css']
})
export class MainmarksComponent implements OnInit {
  // Définir les colonnes de la grille avec le type ColDef
  columnDefs = [
    { headerName: "Last Name", field: "nom", sortable: true, filter: true },
    { headerName: "First Name", field: "prenom", sortable: true, filter: true },
    { headerName: "Date of Birth", field: "dob", sortable: true, filter: true },
    { headerName: "Average Grade", field: "moyenne", sortable: true, filter: true }
  ];

  // Données statiques (pour le test)
  rowData = [
    { nom: "Dupont", prenom: "Jean", dob: "01/01/2000", moyenne: 15.5 },
    { nom: "Martin", prenom: "Sophie", dob: "12/03/1999", moyenne: 18.2 },
    { nom: "Lemoine", prenom: "Paul", dob: "21/07/1998", moyenne: 14.0 },
    { nom: "Durand", prenom: "Alice", dob: "03/10/2001", moyenne: 17.8 },
    { nom: "Leroy", prenom: "Marie", dob: "15/08/1997", moyenne: 16.3 }
  ];


  ngOnInit(): void {
    console.log("Columns:", this.columnDefs);
    console.log("Row Data:", this.rowData);
  }
}
