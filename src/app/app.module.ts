import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {ModalModule} from "ng2-modal";

import { AppComponent } from './app.component';
import { Sidebar } from './sidebar/sidebar.component';
import { LocationHeader } from './location-header/location-header.component';
import { ScheduleHeader } from './schedule-header/schedule-header.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { routing } from './app.routing';
import { TaskComponent } from './task/task.component';
import { CalendarHeaderTitleComponent } from './calendar-header-title/calendar-header-title.component';
import { TemplateComponent } from './template/template.component';
import { FooterComponent } from './footer/footer.component';
import { EventsService } from './events.service';
import { TemplatesService } from './templates.service';
import { GoLiveService } from './go-live.service';
import { TemplateListComponent } from './template-list/template-list.component';
import { GoogleService } from './google.service';
import { DayCardComponent } from './day-card/day-card.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoLiveInputComponent } from './go-live-input/go-live-input.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

@NgModule({
  declarations: [
    AppComponent,
    Sidebar,
    LocationHeader,
    ScheduleHeader,
    CalendarHeader,
    ContentContainerComponent,
    TaskComponent,
    CalendarHeaderTitleComponent,
    TemplateComponent,
    FooterComponent,
    TemplateListComponent,
    DayCardComponent,
    ScheduleComponent,
    LoginPageComponent,
    GoLiveInputComponent,
    EditEventComponent,
    CreateEventComponent,
    CreateTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
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
