import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from "./services/data.service";

import { AppComponent } from './app.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendaDailyComponent } from './components/agenda-daily/agenda-daily.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    AgendaDailyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{
    provide: "data", 
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
