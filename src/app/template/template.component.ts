import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private templatesService:TemplatesService, private eventsService:EventsService) { }

  events = [];

  ngOnInit() {
  	console.log(this.templatesService.currTmpl.template_id)
    this.eventsService.getEvents(this.templatesService.currTmpl.template_id).subscribe(data => {
      for (let i = 1; i <= data.length; i++) {
        let mult = data.filter(event => event.day_number == i)
        if (mult.length > 0) {
          this.events.push(mult)
        }
      }
      console.log('data', this.events)
    })
  }
}
