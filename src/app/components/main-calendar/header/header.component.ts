import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {SetDate} from "../store/calendar.action";
import * as moment from 'moment';
import {Moment} from "moment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private controllerArrows = 0;
  private now: Moment;
  constructor(private _store: Store<object>) { }

  ngOnInit() {
    this.now = moment();
    this._store.dispatch( new SetDate(this.now));
  }
  private moreMonths( diff?: number) {
    this.controllerArrows += diff;
    this.now =  moment().add(   this.controllerArrows, 'month');
    this._store.dispatch( new SetDate(this.now));
  }

}
