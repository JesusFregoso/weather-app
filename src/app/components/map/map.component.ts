import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
declare var ol: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  @Input()
  clicked:any;

  constructor() { }


  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clicked && !changes.clicked.firstChange) {
      this.drawMap();
    }
  }

  drawMap(){
    console.log(this.map);
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
    console.log(ol);

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      var lon = lonlat[0];
      var lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });
  }


}
