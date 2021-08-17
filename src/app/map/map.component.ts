import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { Property, PropertyState } from '../store/app.reducer'; 
 
declare const maplibregl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Input()
  properties: Property[]=[]; 
  show: boolean=false;  
  constructor(private map: MapService,private http: HttpClient,private store: Store) {
    this.map.init();
   }

  
  ngOnInit() {
    this.map.buildMap();
    this.store.select((state:any) => state.properties)
      .subscribe((data: PropertyState) => {
        this.properties = data.records; 
      }); 
    this.getpins();
  }
  formatLabel(value: number) { 
    return value;
  }
  showMat()
  {
    this.show = true;
  }
  getpins()
  {
    this.properties
    .filter(({geocode}) => {
      return geocode.IsValid;
    })
    .forEach(({geocode}) => {
      console.log('inside forEach');          
        new mapboxgl.Marker({ color: 'black', rotation: 90 })
                .setLngLat([geocode.Longitude, geocode.Latitude])
                .addTo(this.map.map); 
      
    });  
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.properties){
      console.log(this.properties);
      this.properties
      .filter(({geocode}) => {
        return geocode.IsValid;
      })
      .forEach(({geocode}) => {
        console.log('inside forEach');          
          new mapboxgl.Marker({ color: 'black', rotation: 45 })
                  .setLngLat([geocode.Latitude, geocode.Longitude])
                  .addTo(this.map.map); 
        
      });      
    }
  }
}
