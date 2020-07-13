import { Component, OnInit, Input } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import * as olSource from 'ol/source'
import * as olProj from 'ol/proj';
import * as olLayer from 'ol/layer';
import * as olGeom from 'ol/geom';
import * as olControl from 'ol/control';

import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() user:User

  map: Map;
  layer: olLayer;
  cordinate: string;
  cc: string[];
  lat: number;
  long: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    this.getUser();
    //this.getMap([7.0785, 51.4614]);


  }


  ngAfterViewInit() {
    this.map.setTarget('map');
  }

  getUser() {
    this.userService.getUser().subscribe(
      (response)=>
      {
        
        this.user = response;

        this.cordinate = this.user.address.coordinates;
        this.cc = this.cordinate.split(',');
        this.lat = Number(this.cc[0]);
        this.long = Number(this.cc[1]);
        
        var arr = [this.lat,this.long];
        this.getMap(arr)
      },
      (error) => console.log(error));
    console.log(this.user);
    
  }

  getMap(arr: any) {

    arr = [7.0785, 51.4614];
    //arr = [68.630432, -157.184773];
    



    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: olProj.fromLonLat(arr),
        zoom: 5
      })
    });

    this.layer = new olLayer.Vector({
      source: new olSource.Vector({
          features: [
              new Feature({
                  geometry: new olGeom.Point(olProj.fromLonLat(arr))
              })
          ]
      })
  });
  this.map.addLayer(this.layer);

  }

  download_img(el) {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // get image URI from canvas object
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
  }

}
