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
  const [wheelType, setWheelType] = useState<string>('verticalWheel');
  const [specialMode, setSpecialMode] = useState<boolean>(false);
  const [condition, setCondition] = useState<Condition>({
    min: wheelType === 'wheel' ? 2 : wheelType === 'verticalWheel' ? 6 : 10,
    max: wheelType === 'wheel' ? 8 : wheelType === 'verticalWheel' ? 11 : 20,
    distance: 2000,
    rankPreference: 'POPULARITY',
  });

  // Wheel
  const [rotation, setRotation] = useState<number>(0);

  const spin = () => {
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(selectedPlaces.length); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem);
    
    setTimeout(() => {
      secondPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
  };

  // Google Places API

  const [places, setPlaces] = useState<Place[]>([
    {
      id: 'ChIJKZrwuYACaDQRQRNBQ36-eoQ',
      types: ['steak_house', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '235台灣新北市中和區建一路92號',
      location: {
        latitude: 25.000949499999997,
        longitude: 121.4879079,
      },
      rating: 4.3,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '我家牛排 中和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJMSvxi-epQjQR6kLpzDTtNLQ',
      types: [
        'brunch_restaurant',
        'breakfast_restaurant',
        'chinese_restaurant',
        'restaurant',
        'food',
        'point_of_interest',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區永和路二段284號',
      location: {
        latitude: 25.0154903,
        longitude: 121.51611449999999,
      },
      rating: 3.8,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '世界豆漿大王',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ9b45QOupQjQRRokt23BLGwE',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區竹林路39巷13號',
      location: {
        latitude: 25.0146663,
        longitude: 121.5184932,
      },
      rating: 4.1,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '竹林雞肉-永和總店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJJ4OSAAOpQjQRkEw6XR1eEFg',
      types: ['korean_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區永利路47號1 樓',
      location: {
        latitude: 25.0052079,
        longitude: 121.51927819999999,
      },
      rating: 4.2,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '打爆豬韓式燒肉吃到飽新北永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJheiMcwapQjQR-tHQmvZa5XY',
      types: ['restaurant', 'cafe', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '235台灣新北市中和區中安街85號B1',
      location: {
        latitude: 25.001476099999998,
        longitude: 121.51264470000001,
      },
      rating: 4.6,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: "BUNA CAF'E 布納咖啡館 中和公園館",
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJdW4lapapQjQRaJC3AjqdGbI',
      types: ['japanese_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區信義路5巷4號',
      location: {
        latitude: 25.011696699999998,
        longitude: 121.5143852,
      },
      rating: 4.3,
      regularOpeningHours: {
        openNow: false,
      },
      displayName: {
        text: '品都串燒 永和',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ2TeOC-upQjQRrNp_hWdYEX0',
      types: [
        'sushi_restaurant',
        'japanese_restaurant',
        'restaurant',
        'food',
        'point_of_interest',
        'establishment',
      ],
      formattedAddress: '235029台灣新北市中和區橋和路5號',
      location: {
        latitude: 25.005253500000002,
        longitude: 121.4883687,
      },
      rating: 4.2,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: 'くら寿司 藏壽司 中和橋和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJaSiY_9ypQjQRFpJ-BCmLrVE',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區保平路18巷1號',
      location: {
        latitude: 25.0076477,
        longitude: 121.51233649999999,
      },
      rating: 4.3,
      regularOpeningHours: {
        openNow: false,
      },
      displayName: {
        text: '阿爸の芋圓 樂華店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJUzP_O-GpQjQRx6eg6q6pzfA',
      types: ['chinese_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區智光街22號',
      location: {
        latitude: 24.9992341,
        longitude: 121.51807060000002,
      },
      rating: 4.2,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '客家小館',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJk1KfRt2pQjQRDWMUgDGxhzo',
      types: ['chinese_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區永和路一段46號',
      location: {
        latitude: 25.0056945,
        longitude: 121.51313100000002,
      },
      rating: 4.1,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '五草車中華麵食館',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJr-BYBeupQjQRX7ElhKUm5mU',
      types: [
        'thai_restaurant',
        'restaurant',
        'food',
        'point_of_interest',
        'store',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區復興街87號',
      location: {
        latitude: 25.014046300000004,
        longitude: 121.51763,
      },
      rating: 4,
      regularOpeningHours: {
        openNow: false,
      },
      displayName: {
        text: '北蘭阿姨商行',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJiYJnn_6pQjQRlU8dbEd3nSM',
      types: ['japanese_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '235台灣新北市中和區橋和路3號1樓',
      location: {
        latitude: 25.0052162,
        longitude: 121.4880738,
      },
      rating: 4.4,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '涮乃葉 中和台科廣場店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJXVBM2MSpQjQRvI6suxrddWI',
      types: ['steak_house', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區竹林路14號',
      location: {
        latitude: 25.0148337,
        longitude: 121.5164528,
      },
      rating: 4.4,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '小時厚牛排-新北永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJY8aFMtSpQjQRmGBfwwleOjw',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區福和路214號1樓',
      location: {
        latitude: 25.0077467,
        longitude: 121.51951160000002,
      },
      rating: 4.4,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '雞湯大叔 永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJQaBhKiapQjQRj_-J97ZELXo',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '235台灣新北市中和區永貞路274號1樓',
      location: {
        latitude: 25.003869899999998,
        longitude: 121.5135437,
      },
      rating: 4.7,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '狂一鍋－中和永貞店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJbbhQmGypQjQRL2G_iL8cDw0',
      types: ['japanese_restaurant', 'restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區得和路131號',
      location: {
        latitude: 25.0003915,
        longitude: 121.51903079999998,
      },
      rating: 4.9,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '一樂漁場生魚片丼飯專賣店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJSTQjAN2pQjQRI_eRnd_itIs',
      types: [
        'cafe',
        'brunch_restaurant',
        'coffee_shop',
        'restaurant',
        'food',
        'point_of_interest',
        'store',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區水源街21巷2號',
      location: {
        latitude: 25.0043786,
        longitude: 121.5113037,
      },
      rating: 4.3,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '自由溫室咖啡廳',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJIb0vcpepQjQR6RTqks9oVTw',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區復興街72號1樓',
      location: {
        latitude: 25.0134075,
        longitude: 121.51714159999997,
      },
      rating: 4.4,
      regularOpeningHours: {
        openNow: false,
      },
      displayName: {
        text: '宋朝',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ8aDWZy-pQjQR61DvkDGRP7A',
      types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      formattedAddress: '234台灣新北市永和區永和路二段116號5樓',
      location: {
        latitude: 25.011953,
        longitude: 121.51524909999999,
      },
      rating: 4.5,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '築間幸福鍋物 新北永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ1dJLaOqpQjQRGgH-GnpnQdQ',
      types: [
        'fast_food_restaurant',
        'brunch_restaurant',
        'hamburger_restaurant',
        'american_restaurant',
        'restaurant',
        'food',
        'point_of_interest',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區永和路二段170號',
      location: {
        latitude: 25.013170799999997,
        longitude: 121.51550599999999,
      },
      rating: 3.9,
      regularOpeningHours: {
        openNow: true,
      },
      displayName: {
        text: '麥當勞-永和餐廳',
        languageCode: 'zh-TW',
      },
    },
  ]);

  const fetchPlaces = async () => {
    console.log(location);
    // const data = {
    //   includedTypes: ['restaurant'],
    //   excludedTypes: [
    //     'supermarket',
    //     'park',
    //     'zoo',
    //     'amusement_park',
    //     'aquarium',
    //     'art_gallery',
    //     'museum',
    //   ],
    //   maxResultCount: 20,
    //   locationRestriction: {
    //     circle: {
    //       center: location,
    //       radius: condition.distance,
    //     },
    //   },
    //   rankPreference: 'POPULARITY', // 依照熱門程度排名
    // };

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'X-Goog-Api-Key': google_key,
    //   'X-Goog-FieldMask':
    //     'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.photos,places.location,places.regularOpeningHours.openNow', // 可自訂要顯示的欄位
    // };

    // const response = await axios.post(
    //   'https://places.googleapis.com/v1/places:searchNearby',
    //   data,
    //   {
    //     headers,
    //   }
    // );
    // setPlaces(response.data.places);
    // setPlaces([]);
    // setTimeout(() => {
    //   setPlaces(places);
    // }, 1000);
  };

  // useEffect(() => {
  //   fetchPlaces();
  // }, [condition]);

  useEffect(() => {
    setSelectedItem(-1);
  }, [selectedPlaces.length]);

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
