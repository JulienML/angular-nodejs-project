import { Routes } from '@angular/router';
import { MainmarksComponent } from './mainmarks/mainmarks.component';  // Importer le composant Mainmarks

export const routes: Routes = [
  { path: 'mainmarks', component: MainmarksComponent },  // Ajouter la route vers MainmarksComponent
  { path: '', redirectTo: '/mainmarks', pathMatch: 'full' }  // Définir la route par défaut
];

