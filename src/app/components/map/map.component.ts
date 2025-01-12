import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 15);  // Zoom plus élevé pour plus de détails

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    const geocoder = (L.Control as any)?.Geocoder?.nominatim(); // Vérification que geocoder est défini

    this.marker = L.marker([36.8468821, 10.1979544], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      console.log('Coordonnées GPS :', position);

      if (geocoder) {
        geocoder.reverse(
          position,
          this.map.options.crs?.scale(this.map.getZoom()), // Vérification si crs est défini
          (results: any) => {
            if (results && results[0]) {
              const address = results[0].name;
              const latLng = position;
              console.log('Adresse obtenue :', address);
              console.log('Coordonnées obtenues :', latLng);
              alert(`Adresse : ${address}\nCoordonnées : ${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`);
            } else {
              alert('Aucune adresse trouvée.');
            }
          }
        );
      } else {
        console.error('Geocoder est indéfini.');
      }
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const latlng = event.latlng;
      console.log('Coordonnées clic carte :', latlng);
      this.marker.setLatLng(latlng);

      if (geocoder) {
        geocoder.reverse(
          latlng,
          this.map.options.crs?.scale(this.map.getZoom()), // Vérification si crs est défini
          (results: any) => {
            if (results && results[0]) {
              const address = results[0].name;
              const latLng = latlng;
              alert(`Adresse sélectionnée : ${address}\nCoordonnées : ${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`);
            } else {
              alert('Aucune adresse trouvée.');
            }
          }
        );
      } else {
        console.error('Geocoder est indéfini.');
      }
    });
  }
}
