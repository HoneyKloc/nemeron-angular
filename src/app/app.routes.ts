import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SingleComponent } from './pages/single/single.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'single', redirectTo: '/single', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    {path: 'single', component: SingleComponent}
];
