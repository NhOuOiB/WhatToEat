import { FC, useEffect } from 'react';
import { Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
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
  const apiIsLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!apiIsLoaded) {
      console.log('API 尚未加載');
      return;
    }

    console.log('API 已加載，可以使用 google.maps 了');
    // 當地圖庫加載完成後，apiIsLoaded 將為 true，並且可以使用全局的 `google.maps` 命名空間。
  }, [apiIsLoaded]);
  const selectedPlace = selectedPlaces[selectedItem];
  return (
    <>
      {apiIsLoaded ? (
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
            <img src="/duck_walking.gif" alt="Egg" width={32} height={32} />
          </AdvancedMarker>
          {selectedPlace && (
            <AdvancedMarker
              position={{
                lat: selectedPlace.location.latitude,
                lng: selectedPlace.location.longitude,
              }}
            >
              <img src="/egg.svg" alt="Egg" width={32} height={32} />
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
