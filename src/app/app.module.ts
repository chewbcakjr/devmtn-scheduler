import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Sidebar } from './sidebar/sidebar.component';
import { LocationHeader } from './location-header/location-header.component';
import { ScheduleHeader } from './schedule-header/schedule-header.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { ContentContainerComponent } from './content-container/content-container.component';
<<<<<<< HEAD
import { TemplateComponent } from './template/template.component';
import { ContentComponent } from './content/content.component';
=======
import { routing } from './app.routing';
>>>>>>> master


@NgModule({
  declarations: [
    AppComponent,
    Sidebar,
    LocationHeader,
    ScheduleHeader,
    CalendarHeader,
    ContentContainerComponent,
    TemplateComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
