import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

//services
import { DatesService } from '../../services/dates.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  activeTab:any = 'temperature';
  @Input()
  city:any;
  constructor(private _dateService: DatesService) { }

  ngOnInit() {
  }
}
