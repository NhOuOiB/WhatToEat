import { FC, useState, useEffect } from 'react';
import { Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { map_id } from '../../../utils/config';
import { useApiIsLoaded } from '@vis.gl/react-google-maps';
import { Skeleton } from '@/components/ui/skeleton';
import { Place } from '@/types/type';

interface Props {
  location: { latitude: number; longitude: number };
  selectedPlaces: Place[];
  selectedItem: number;
}

const CustomMap: FC<Props> = ({ location, selectedPlaces, selectedItem }) => {
  // Google Maps API
  const apiIsLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!apiIsLoaded) {
      console.log('API 尚未加載');
      return;
    }

    console.log('API 已加載，可以使用 google.maps 了');
  }, [apiIsLoaded]);

  const selectedPlace = selectedPlaces?.[selectedItem];

  // Directions
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ map, markerOptions: { visible: false } })
    );
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !selectedPlace) return;

    directionsService
      .route({
        origin: { lat: location?.latitude, lng: location?.longitude },
        destination: {
          lat: selectedPlace?.location?.latitude,
          lng: selectedPlace?.location?.longitude,
        },
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  }, [directionsService, directionsRenderer, location, selectedPlace]);
  return (
    <>
      {apiIsLoaded ? (
        <Map
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={15}
          colorScheme="DARK"
          mapId={map_id}
          disableDefaultUI={true}
          fullscreenControl={true}
          streetViewControl={true}
          zoomControl={true}
          renderingType="RASTER"
        >
          <AdvancedMarker position={{ lat: location.latitude, lng: location.longitude }}>
            <img src="/duck_walking.gif" alt="Egg" width={32} height={32} />
          </AdvancedMarker>
          {selectedPlace && (
            <AdvancedMarker
              position={{
                lat: selectedPlace.location.latitude,
                lng: selectedPlace.location.longitude,
              }}
            >
              <img src="/egg.svg" alt="Egg" width={36} height={36} />
            </AdvancedMarker>
          )}
        </Map>
      ) : (
        <Skeleton className="w-full h-full rounded-none bg-gray-100" />
      )}
    </>
  );
};

export default CustomMap;
