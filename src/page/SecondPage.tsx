import { FC,useEffect,useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { google_key, map_id } from '../../utils/config';
interface Props {
  location: { latitude: number; longitude: number };
}

const SecondPage: FC<Props> = ({ location }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.stopPropagation();
    };

    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="h-screen snap-start flex justify-center items-center bg-gray-600">
      <div className="w-1/2 h-3/5 border border-white shadow-md shadow-white" ref={mapContainerRef}>
        <APIProvider apiKey={google_key}>
          <Map
            // style={{ width: '100%', height: '100%' }}
            defaultCenter={{ lat: location.latitude, lng: location.longitude }}
            defaultZoom={15}
            colorScheme="DARK"
            mapId={map_id}
            options={{
              disableDefaultUI: true,
              fullscreenControl: true,
              streetViewControl: true,
              zoomControl: true,
            }}
          >
            <AdvancedMarker position={{ lat: location.latitude, lng: location.longitude }}>
              <img src="/egg.svg" alt="Egg" width={32} height={32} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default SecondPage;
