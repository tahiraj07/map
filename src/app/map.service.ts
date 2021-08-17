import { Injectable, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../environments/environment";
import { receivedRecords } from './store/app.actions';
import mockData from './data.json';
import { Property } from './store/app.reducer';
 

@Injectable({
  providedIn: 'root'
})
export class MapService {
  properties: Property[]=[]; 
map: mapboxgl.Map | any;
style = 'mapbox://styles/mapbox/streets-v11';
lat = 32.800501;
lng = -97.5695082;
zoom = 9
constructor(private store: Store) { 
}
init(){
  this.store.dispatch(receivedRecords({payload: mockData}));
}

buildMap() {
  this.map = new mapboxgl.Map({
    accessToken: environment.mapbox.accessToken,
    container: 'map',
    style: this.style,
    zoom: this.zoom,
    center: [this.lng, this.lat]
  }) 
 this.map.addControl(new mapboxgl.NavigationControl());
} 
 
}
