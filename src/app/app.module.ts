import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';

//Graphs
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './components/graph/graph.component';
import { CitiesComponent } from './components/cities/cities.component';


//Imports
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    GraphComponent,
    CitiesComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
