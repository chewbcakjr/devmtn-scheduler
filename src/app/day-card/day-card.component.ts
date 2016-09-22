// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { EventsService } from '../events.service';

declare var $:any;

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {
//  @ViewChild('selectElem') el:ElementRef;

  currEvent = {};

  @Input() event = [];

  ngAfterViewInit() {
        $('.modal-trigger').leanModal();
    }

    clickConsole() {
      console.log('hoo yeeaa');
    }

    storeCurrEvent(event) {
      console.log(event)
      this.eventsService.currEvent = event;
      this.currEvent = event;
      return event;
    }

  constructor(private eventsService:EventsService) { }

  ngOnInit() {

  }

}
