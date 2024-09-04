import { FC, useEffect, useState } from 'react';
import SettingPanel from '../components/settingPanel/SettingPanel';
import WheelPanel from '../components/wheelPanel/WheelPanel';
import VerticalWheelPanel from '../components/wheelPanel/VerticalWheelPanel.tsx';
import HorizontalWheelPanel from '../components/wheelPanel/HorizontalWheelPanel.tsx';
import { Condition } from '../types/type.ts';
// import axios from 'axios';
// import { google_key } from '../../utils/config.ts';
import { Place } from '../types/type.ts';

interface Props {
  location : { latitude: number; longitude: number };
}

const FirstPage: FC<Props> = ({ location }) => {
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
  const [selectedItem, setSelectedItem] = useState<number>(-1);

  const spin = () => {
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(selectedPlaces.length); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem);
  };

  // Google Places API

  const [places, setPlaces] = useState<Place[]>([
    {
      id: 'ChIJKZrwuYACaDQRQRNBQ36-eoQ',
      types: ['steak_house', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '235台灣新北市中和區建一路92號',
      rating: 4.3,
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
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區永和路二段284號',
      rating: 3.8,
      displayName: {
        text: '世界豆漿大王',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJheiMcwapQjQR-tHQmvZa5XY',
      types: ['restaurant', 'cafe', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '235台灣新北市中和區中安街85號B1',
      rating: 4.6,
      displayName: {
        text: "BUNA CAF'E 布納咖啡館 中和公園館",
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJdW4lapapQjQRaJC3AjqdGbI',
      types: ['japanese_restaurant', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '234台灣新北市永和區信義路5巷4號',
      rating: 4.3,
      displayName: {
        text: '品都串燒 永和',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ25_ZtLWpQjQRaGGzvUBvduw',
      types: [
        'barbecue_restaurant',
        'korean_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '108台灣台北市萬華區寶興街163號',
      rating: 4.1,
      displayName: {
        text: '玖佰號 火鍋/烤豬五花 專門店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ2TeOC-upQjQRrNp_hWdYEX0',
      types: [
        'sushi_restaurant',
        'japanese_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '235029台灣新北市中和區橋和路5號',
      rating: 4.2,
      displayName: {
        text: 'くら寿司 藏壽司 中和橋和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJaSiY_9ypQjQRFpJ-BCmLrVE',
      types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '234台灣新北市永和區保平路18巷1號',
      rating: 4.3,
      displayName: {
        text: '阿爸の芋圓 樂華店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJRZ0k6LCpQjQR6ECASSDTf50',
      types: [
        'fast_food_restaurant',
        'brunch_restaurant',
        'hamburger_restaurant',
        'american_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '108台灣台北市萬華區萬大路215號',
      rating: 3.8,
      displayName: {
        text: '麥當勞-台北萬大二餐廳（設有得來速）',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJk1KfRt2pQjQRDWMUgDGxhzo',
      types: ['chinese_restaurant', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '234台灣新北市永和區永和路一段46號',
      rating: 4.1,
      displayName: {
        text: '五草車中華麵食館',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJE2gr0iqoQjQReUD33kMutgA',
      types: ['steak_house', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '235台灣新北市中和區板南路661號',
      rating: 4.7,
      displayName: {
        text: '西堤牛排 中和板南店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJiYJnn_6pQjQRlU8dbEd3nSM',
      types: ['japanese_restaurant', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '235台灣新北市中和區橋和路3號1樓',
      rating: 4.4,
      displayName: {
        text: '涮乃葉 中和台科廣場店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJr-BYBeupQjQRX7ElhKUm5mU',
      types: [
        'thai_restaurant',
        'restaurant',
        'point_of_interest',
        'store',
        'food',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區復興街87號',
      rating: 4,
      displayName: {
        text: '北蘭阿姨商行',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJXVBM2MSpQjQRvI6suxrddWI',
      types: ['steak_house', 'restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '234台灣新北市永和區竹林路14號',
      rating: 4.4,
      displayName: {
        text: '小時厚牛排-新北永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJQaBhKiapQjQRj_-J97ZELXo',
      types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '235台灣新北市中和區永貞路274號1樓',
      rating: 4.7,
      displayName: {
        text: '狂一鍋－中和永貞店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJI57DZqcCaDQR-eUT5MUPEK8',
      types: [
        'fast_food_restaurant',
        'brunch_restaurant',
        'hamburger_restaurant',
        'american_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '235台灣新北市中和區中山路二段583號1樓',
      rating: 3.8,
      displayName: {
        text: '麥當勞-中和中山餐廳',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJSTQjAN2pQjQRI_eRnd_itIs',
      types: [
        'cafe',
        'coffee_shop',
        'brunch_restaurant',
        'restaurant',
        'point_of_interest',
        'store',
        'food',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區水源街21巷2號',
      rating: 4.3,
      displayName: {
        text: '自由溫室咖啡廳',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJ8aDWZy-pQjQR61DvkDGRP7A',
      types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
      formattedAddress: '234台灣新北市永和區永和路二段116號5樓',
      rating: 4.5,
      displayName: {
        text: '築間幸福鍋物 新北永和店',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJx3TSH3OpQjQRTp45cxQTy-k',
      types: [
        'vegetarian_restaurant',
        'vegan_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '235台灣新北市中和區中山路二段427號咖啡廳1樓&3樓',
      rating: 4.4,
      displayName: {
        text: '崇德發蔬食餐廳.咖啡廳',
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
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '234台灣新北市永和區永和路二段170號',
      rating: 3.9,
      displayName: {
        text: '麥當勞-永和餐廳',
        languageCode: 'zh-TW',
      },
    },
    {
      id: 'ChIJV3oxq9epQjQR7bVgz_E6z54',
      types: [
        'fast_food_restaurant',
        'brunch_restaurant',
        'hamburger_restaurant',
        'american_restaurant',
        'restaurant',
        'point_of_interest',
        'food',
        'establishment',
      ],
      formattedAddress: '235台灣新北市中和區中和路38號',
      rating: 3.5,
      displayName: {
        text: '麥當勞-中和餐廳',
        languageCode: 'zh-TW',
      },
    },
  ]);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

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
    //     'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.photos', // 可自訂要顯示的欄位
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
    setTimeout(() => {
      setPlaces(places);
    }, 1000);
  };

  useEffect(() => {
    fetchPlaces();
  }, [condition]);

  useEffect(() => {
    setSelectedItem(-1);
  }, [selectedPlaces.length]);

  useEffect(() => {
    setSpecialMode(false);
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
        <VerticalWheelPanel selectedPlaces={selectedPlaces} condition={condition} />
      ) : (
        <HorizontalWheelPanel condition={condition} places={places} />
      )}
    </div>
  );
};

export default FirstPage;
