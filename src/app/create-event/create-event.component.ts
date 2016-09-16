import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventsService:EventsService, private templatesService:TemplatesService) { }

  ngOnInit():void {
    console.log(this.templatesService.currTmpl);
    this.eventsService.createEvent(this.templatesService.currTmpl.template_id,'Blah is super awesome','now', 'never', 'me', 'nuff not said', 1)
    .subscribe(data => {
      console.log(data);
    })
  }

}
