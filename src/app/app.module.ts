import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Sidebar } from './sidebar/sidebar.component';
import { LocationHeader } from './location-header/location-header.component';
import { ScheduleHeader } from './schedule-header/schedule-header.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { routing, appRoutingProviders } from './app.routing';
import { EventComponent } from './event/event.component';
import { TaskComponent } from './task/task.component';
import { CalendarHeaderTitleComponent } from './calendar-header-title/calendar-header-title.component';
import { TemplateComponent } from './template/template.component';
import { FooterComponent } from './footer/footer.component';
import { EventsService } from './events.service';
import { TemplatesService } from './templates.service';
import { GoLiveService } from './go-live.service';
import { TemplateListComponent } from './template-list/template-list.component';
import { DayCardComponent } from './day-card/day-card.component';


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
    TemplateComponent,
    FooterComponent,
    TemplateListComponent,
    DayCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
		ReactiveFormsModule
  ],
  providers: [

		appRoutingProviders,
		EventsService,
		TemplatesService,
    GoLiveService

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
