import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {SetDate} from "../store/calendar.action";
import * as moment from 'moment';
import {Moment} from "moment";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private controllerArrows = 0;
  private now: Moment;
  private labelMonth: string;
  constructor(private _store: Store<object>,
              private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activeRoute.params.subscribe(params =>{
      this.labelMonth= params['labelMonth'];
      if(isNullOrUndefined( this.labelMonth )){
        this.now = moment();
      }else{
        this.now = moment(this.labelMonth, 'YYYY-MM-DD');
      }
      this._store.dispatch( new SetDate(this.now));
    })
  }
  private moreMonths( diff?: number) {
    this.controllerArrows += diff;
    this.now =  moment().add(   this.controllerArrows, 'month');
    this._store.dispatch( new SetDate(this.now));
  }

}
