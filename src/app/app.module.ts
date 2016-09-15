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
import { routing } from './app.routing';
import { EventComponent } from './event/event.component';
import { TaskComponent } from './task/task.component';
import { CalendarHeaderTitleComponent } from './calendar-header-title/calendar-header-title.component';
import { EventCardComponent } from './event-card/event-card.component';
import { FooterComponent } from './footer/footer.component';
import { EventsService } from './events.service';
import { TemplatesService } from './templates.service';
import { GoLiveService } from './go-live.service';
import { TemplateListComponent } from './template-list/template-list.component';
import { GoogleService } from './google.service';

@NgModule({
  declarations: [
    AppComponent,
    Sidebar,
    LocationHeader,
    ScheduleHeader,
    CalendarHeader,
    ContentContainerComponent,
    EventComponent,
    TaskComponent,
    CalendarHeaderTitleComponent,
    EventCardComponent,
    FooterComponent,
    TemplateListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    EventsService,
    TemplatesService,
    GoLiveService,
    GoogleService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
