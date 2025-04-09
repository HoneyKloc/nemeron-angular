import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleComponent } from './pages/single/single.component';
import { CoupleComponent } from './pages/couple/couple.component';
import { TeamComponent } from './pages/team/team.component';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { register } from 'swiper/element/bundle';
import { MesComponent } from './components/mes/mes.component';
import { DiasComponent } from './components/dias/dias.component';
import { MesmobileComponent } from './components/mesmobile/mesmobile.component';
import { DiamobileComponent } from './components/diamobile/diamobile.component';
import { SinastraComponent } from './components/sinastra/sinastra.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MaskitoDirective} from '@maskito/angular';
import { HttpClientModule } from '@angular/common/http';

register();
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SingleComponent,
    CoupleComponent,
    TeamComponent,
    MesComponent,
    DiasComponent,
    MesmobileComponent,
    DiamobileComponent,
    SinastraComponent,
    // NgbModule,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaskitoDirective,
    FormsModule,
    NgbDatepickerModule, NgbAlertModule,
    MatFormFieldModule,MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [ MatDatepickerModule,  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})


export class AppModule { }
