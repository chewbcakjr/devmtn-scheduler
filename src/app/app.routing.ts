import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// need to import all components that we will be routing to here
import { AppComponent } from './app.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { TemplateComponent } from './template/template.component';
import { DayCardComponent } from './day-card/day-card.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoLiveInputComponent } from './go-live-input/go-live-input.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const appRoutes:Routes = [
	{
		path: 'dashboard',
		component: TemplateListComponent
	},
	{ path: 'login',
component: LoginPageComponent
	},
	{
		path: 'event',
		component: CreateEventComponent
	},
	{
		path: 'template',
		component: TemplateComponent
	},
	{
		path: 'golive',
		component: GoLiveInputComponent
	},
	{	 
		path: 'schedule',
		component: ScheduleComponent
	},
	{	 
		path: 'editevent',
		component: EditEventComponent
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}

];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
