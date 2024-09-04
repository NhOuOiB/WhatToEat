import { FC, useEffect, useRef } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { google_key } from '../../utils/config';
import CustomMap from '@/components/map/CustomMap';

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
      <div
        className="w-full h-3/5 md:w-3/4 md:h-3/5 xl:w-1/2 xl:h-3/5 border border-white shadow-md shadow-white"
        ref={mapContainerRef}
      >
        <APIProvider apiKey={google_key}>
          <CustomMap location={location} />
        </APIProvider>
      </div>
    </div>
  );
};

export default SecondPage;
