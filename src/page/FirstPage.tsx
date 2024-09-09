import { FC, useEffect, useState } from 'react';
import SettingPanel from '../components/settingPanel/SettingPanel';
import WheelPanel from '../components/wheelPanel/WheelPanel';
import VerticalWheelPanel from '../components/wheelPanel/VerticalWheelPanel.tsx';
import HorizontalWheelPanel from '../components/wheelPanel/HorizontalWheelPanel.tsx';
import { Condition } from '../types/type.ts';
import axios from 'axios';
import { google_key } from '../../utils/config.ts';
import { Place } from '../types/type.ts';

interface Props {
  location: { latitude: number; longitude: number };
  selectedPlaces: Place[];
  setSelectedPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  secondPageRef: React.RefObject<HTMLDivElement>;
}

const FirstPage: FC<Props> = ({
  location,
  selectedPlaces,
  setSelectedPlaces,
  selectedItem,
  setSelectedItem,
  secondPageRef,
}) => {
  const [wheelType, setWheelType] = useState<string>('wheel');
  const [specialMode, setSpecialMode] = useState<boolean>(false);
  const [condition, setCondition] = useState<Condition>({
    min: wheelType === 'wheel' ? 2 : wheelType === 'verticalWheel' ? 6 : 10,
    max: wheelType === 'wheel' ? 8 : wheelType === 'verticalWheel' ? 10 : 20,
    distance: 2000,
    rankPreference: 'POPULARITY',
    includedTypes: 'restaurant',
  });

  // Wheel
  const [rotation, setRotation] = useState<number>(0);

  const spin = () => {
    setSelectedItem(-1);
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(selectedPlaces.length); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setTimeout(() => {
      setSelectedItem(selectedItem);
    }, 3000);

    setTimeout(() => {
      secondPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
  };

  // Google Places API

  const [places, setPlaces] = useState<Place[]>([]);

  const fetchPlaces = async () => {
    const data = {
      includedTypes: [condition.includedTypes],
      excludedTypes: [
        'supermarket',
        'park',
        'zoo',
        'amusement_park',
        'aquarium',
        'art_gallery',
        'museum',
      ],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: location,
          radius: condition.distance,
        },
      },
      rankPreference: condition.rankPreference, // 依照熱門程度排名
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': google_key,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.photos,places.location,places.regularOpeningHours.openNow', // 可自訂要顯示的欄位
    };

    const response = await axios.post(
      'https://places.googleapis.com/v1/places:searchNearby',
      data,
      {
        headers,
      }
    );
    console.log(response.data.places);
    setPlaces(response.data.places);

    // 檢查新地點是否重複
    const filteredPlaces = response?.data?.places?.filter((place: Place) =>
      selectedPlaces?.some((selectedPlace) => selectedPlace?.id === place?.id)
    );
    setSelectedPlaces(filteredPlaces);
  };

  useEffect(() => {
    setSelectedItem(-1);
  }, [selectedPlaces?.length]);

  useEffect(() => {
    setSpecialMode(false);
    setRotation(0);
    setSelectedItem(-1);
  }, [wheelType]);
  return (
    <div className="w-full md:h-screen flex flex-col md:flex-row justify-center items-center md:gap-10 bg-gray-200 md:px-6 md:py-2 snap-start">
      <SettingPanel
        condition={condition}
        setCondition={setCondition}
        wheelType={wheelType}
        setWheelType={setWheelType}
        specialMode={specialMode}
        setSpecialMode={setSpecialMode}
        places={places}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
        fetchPlaces={fetchPlaces}
      />
      {wheelType === 'wheel' ? (
        <WheelPanel
          rotation={rotation}
          condition={condition}
          selectedItem={selectedItem}
          spin={spin}
          selectedPlaces={selectedPlaces}
          specialMode={specialMode}
        />
      ) : wheelType === 'verticalWheel' ? (
        <VerticalWheelPanel
          selectedPlaces={selectedPlaces}
          condition={condition}
          setSelectedItem={setSelectedItem}
          secondPageRef={secondPageRef}
        />
      ) : (
        <HorizontalWheelPanel condition={condition} places={places} />
      )}
    </div>
  );
};

export default FirstPage;
