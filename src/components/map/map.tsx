import { useEffect, useRef, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import {layerGroup, Marker} from 'leaflet';
import useMap from '../hooks/use-map';
import { CITYES, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';
import { City, Offer, Offers } from '../../types/offer';
import cn from 'classnames';
import { useAppSelector } from '../hooks/use-select';
import { getCurrentCity } from '../../store/offers-data/offers-selectors';


type MapScreenProps = {
  points: Offers;
  selectedPoint: Offer | undefined;
  mapType: string;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


function Map({points,selectedPoint,mapType}:MapScreenProps) {
  const actualCity = useAppSelector(getCurrentCity);
  const city = CITYES.find((cityes) => cityes.name === actualCity) as City;
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  const [currentCity, setCurrentCity] = useState(city);

  useEffect(()=>{
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });
        marker.setIcon(
          selectedPoint !== undefined && point.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(markerLayer);
      });

      if (currentCity !== city) {
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
        setCurrentCity(city);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  },[city, currentCity, map, points, selectedPoint]);

  return (
    <section
      className = {cn(mapType,'map')}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
