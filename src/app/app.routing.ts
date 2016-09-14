import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// need to import all components that we will be routing to here
import { AppComponent } from './app.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { TaskComponent } from './task/task.component';
import { EventComponent } from './event/event.component';
import { TemplateComponent } from './template/template.component';

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
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}

];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
