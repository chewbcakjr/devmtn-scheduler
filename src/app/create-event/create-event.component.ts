import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventsService:EventsService) { }

  ngOnInit() {
    console.log('hit');
    this.eventsService.createEvent(5,'Evan is awesome','now', 'never', 'me', 'nuff said', 1)
    .subscribe(data => {
      console.log(data);
    })
  }

}
