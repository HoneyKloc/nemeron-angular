import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleComponent } from './pages/single/single.component';
import { CoupleComponent } from './pages/couple/couple.component';
import { TeamComponent } from './pages/team/team.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'single', component: SingleComponent },
    { path: 'reload', component: SingleComponent },
    { path: 'couple', component: CoupleComponent },
    { path: 'team', component: TeamComponent },
    { path: 'reloadc', component: SingleComponent },
    { path: 'reloadt', component: TeamComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload",useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
