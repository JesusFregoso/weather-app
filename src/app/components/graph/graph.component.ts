import { Component, ViewChild, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as moment from 'moment';

//services
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit{
  endDay:any;
  startDay:any;
  dates:any;
  @Input()
  city:any;

  constructor(private _dateService: DatesService) { }

  ngOnInit(){
    this.endDay = moment();
    this.dates = this._dateService.dates;
  }

  getDates(): void {
    this.dates =  this._dateService.getDates()
    .subscribe(dates => this.dates = dates);
  }

  updateChartData() {
    for (let i = 0; i < 15;i++) {
      this.lineChartLabels[i] = `${this.dates[i].format('DD/MM/YY')}`;
    }
    let options = {
      latitud : this.city.latitud,
      longitud : this.city.longitud
    }
    this._dateService.getTemperature(options)
    .subscribe((data:any) => {
      let dataset:any = data.data;
      this.lineChartData.map((item,key)=> {
          for (let i = 0; i < 15;i++) {
            if (item.label === 'Celcius') {
              item.data[i] = dataset[i].temp;
            } else {
              item.data[i] = (dataset[i].temp * 9/5) + 32;
            }
          }
          return item;
        })
      this.updateChart();
      this._dateService.updateTemperature(this.lineChartData);
    })

  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Celcius' },
    { data: [], label: 'Farenheit' }
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(163, 15, 15, 0.69)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  updateChart(){
    this.chart.update();
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.city && !changes.city.firstChange) {
      this.updateChartData();
    }else{
      this._dateService.getCities(true)
      .subscribe((data:any) => {
        this.city = data[0];
        this.updateChartData();
      });
    }
  }

}
