// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridModule } from 'ag-grid-angular';  // Importer AgGridModule
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AgGridModule  // Inclure AgGridModule ici
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
