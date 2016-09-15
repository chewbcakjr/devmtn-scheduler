import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// need to import all components that we will be routing to here
import { AppComponent } from './app.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { TaskComponent } from './task/task.component';
import { EventComponent } from './event/event.component';
// import { EventCardComponent } from './event-card/event-card.component';
import { TemplateListComponent} from './template-list/template-list.component';
import { TemplateComponent } from './template/template.component';
import {DayCardComponent} from './day-card/day-card.component';


const appRoutes:Routes = [
	{
		path: 'dashboard',
		component: TaskComponent
	},
	{
		path: 'event',
		component: EventComponent
	},
	{
		path: 'template',
		component: TemplateComponent
	},
	{
		path: 'templatesList',
		component: TemplateListComponent
	},
	{
		path: 'allEvents',
		component: DayCardComponent
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}

];
export const appRoutingProviders: any[] = [

];


export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
