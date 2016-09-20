// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit, Input} from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {
//  @ViewChild('selectElem') el:ElementRef;

  @Input() event = [];

  ngAfterViewInit() {
        $('.modal-trigger').leanModal();
    }

    clickConsole() {
      console.log('hoo yeeaa');
    }

  constructor() { }

  ngOnInit() {

  }

}
