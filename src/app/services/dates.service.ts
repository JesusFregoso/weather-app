import { Injectable } from '@angular/core';
import { Observable }    from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor(private http: HttpClient) { }
  chart:any;
  dates:any;
  temperatures:any = [];
  key:String = 'eb57cf66bdb14e728325d649d3b361ca';
  //url:String = 'https://api.weatherbit.io/v2.0/history/daily?';
  url:String = ' https://api.weatherbit.io/v2.0/forecast/daily?';
  nodeUrl:String = 'http://localhost:3000/';
  // Service message commands
  updateDates(dates: any) {
    this.dates = dates;
  }

  getDates(): Observable<any> {
    return this.dates;
  }

  getTemperature(options) {
    return this.http.get(this.parseUrl(options));
  }

  parseUrl(options) {
    return `
      ${this.url}lat=${options.latitud}&lon=${options.longitud}&days=15&key=${this.key}
      `;
  }

  updateTemperature(data){
    this.temperatures = data;
  }

  getTemperatures(): Observable<any> {
    return this.temperatures;
  }

  getCities(isDefault:any) {
    return this.http.get(`${this.nodeUrl}cities${isDefault? '?default=true' : ''}`);
  }

}
