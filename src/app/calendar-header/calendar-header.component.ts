import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeader implements OnInit {

  constructor(private templatesService:TemplatesService) { }

  currTmpl = {};
  currWeek = 'Week One'

  ngOnInit() {
  	this.currTmpl = this.templatesService.currTmpl;
  }

}
