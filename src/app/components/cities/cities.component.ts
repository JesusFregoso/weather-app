import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


//services
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  endDate:any;
  endDateInput:any;
  startDate:any;
  dates:any = [];
  cities:any = [];
  cityName:any = 'Obregon';
  city:any = {};

  @Output('changeCity')
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _dateService: DatesService) { }

  ngOnInit() {
    this.endDate = moment();
    this.endDateInput = this.endDate.format('YYYY-MM-DD')
    this.startDate = moment().subtract(14,'days');

    for (let i = 0; i < 15;i++) {
      this.dates[i] = this.addDaysToDate(this.startDate,i);
    }
    this._dateService.updateDates(this.dates);
    this.getCities();
  }

  changeDate(s) {
    this.endDate = moment(this.endDateInput)
    this.startDate = this.endDate.subtract(14,'days');

    for (let i = 0; i < 15;i++) {
      this.dates[i] = this.addDaysToDate(this.startDate,i);
    }
    this._dateService.updateDates(this.dates);
  }

  getCities() {
    this._dateService.getCities(false)
    .subscribe((data:any) => {
      this.cities = data;
    })
  }

  addDaysToDate(date:any,days:any) {
    var newDate = moment(Object.assign({},date));
    return newDate.add(days,'days');
  }

  changingValue($event){
    this.city = this.cities[(this.cities.map((item)=> item.name)).indexOf(this.cityName)];
    this.change.emit(this.city);
  }
}
