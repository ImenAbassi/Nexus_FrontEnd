declare module 'leaflet-control-geocoder' {
    import * as L from 'leaflet';
  
    namespace Control {
      class Geocoder {
        static nominatim(options?: any): any;
      }
    }
    export default Control.Geocoder;
  }
  