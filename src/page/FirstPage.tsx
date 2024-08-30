import { FC, useEffect, useState } from 'react';
import SettingPanel from '../components/settingPanel/SettingPanel';
import WheelPanel from '../components/wheelPanel/WheelPanel';
import VerticalWheelPanel from '../components/wheelPanel/VerticalWheelPanel.tsx';
import HorizontalWheelPanel from '../components/wheelPanel/HorizontalWheelPanel.tsx';
import { Condition } from '../types/type.ts';
import axios from 'axios';
import { google_key } from '../../utils/config.ts';
import { Place } from '../types/type.ts';

const FirstPage: FC = () => {
  const [wheelType, setWheelType] = useState<string>('verticalWheel');
  const [condition, setCondition] = useState<Condition>({
    segments: wheelType === 'wheel' ? 2 : wheelType === 'verticalWheel' ? 6 : 11,
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
    const itemAngle = 360 / Number(condition.segments); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem);
  };

  // 取得使用者位置
  const getLocation = async (): Promise<{ latitude: number; longitude: number }> => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(location);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.log('使用者拒絕提供位置資訊。');
                break;
              case error.POSITION_UNAVAILABLE:
                console.log('無法取得位置資訊。');
                break;
              case error.TIMEOUT:
                console.log('取得位置資訊逾時。');
                break;
            }
            reject(error);
          }
        );
      });
    } else {
      console.log('瀏覽器不支援地理定位。');
      throw new Error('瀏覽器不支援地理定位。');
    }
  };

  // Google Places API

  const [places, setPlaces] = useState<Place[]>([]);

  const fetchPlaces = async () => {
    const location = await getLocation();
    const data = {
      includedTypes: ['restaurant'],
      excludedTypes: [
        'supermarket',
        'park',
        'zoo',
        'amusement_park',
        'aquarium',
        'art_gallery',
        'museum',
      ],
      maxResultCount: condition.segments,
      locationRestriction: {
        circle: {
          center: location,
          radius: condition.distance,
        },
      },
      rankPreference: 'POPULARITY', // 依照熱門程度排名
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': google_key,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.rating', // 可自訂要顯示的欄位
    };

    const response = await axios.post(
      'https://places.googleapis.com/v1/places:searchNearby',
      data,
      {
        headers,
      }
    );
    // setPlaces(response.data.places);
    setPlaces([
      {
        types: ['steak_house', 'restaurant', 'point_of_interest', 'food', 'establishment'],
        formattedAddress: '235台灣新北市中和區建一路92號',
        rating: 4.3,
        displayName: {
          text: '我家牛排 中和店',
          languageCode: 'zh-TW',
        },
      },
      {
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
    ]);
    // console.log(response.data.places);
  };

  useEffect(() => {
    fetchPlaces();
  }, [condition]);

  useEffect(() => {
    setSelectedItem(0);
  }, [condition.segments]);
  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-200 px-6 py-2 snap-start">
      <SettingPanel
        condition={condition}
        setCondition={setCondition}
        wheelType={wheelType}
        setWheelType={setWheelType}
      />
      {wheelType === 'wheel' ? (
        <WheelPanel
          rotation={rotation}
          condition={condition}
          selectedItem={selectedItem}
          spin={spin}
          places={places}
        />
      ) : wheelType === 'verticalWheel' ? (
        <VerticalWheelPanel condition={condition} places={places} />
      ) : (
        <HorizontalWheelPanel condition={condition} places={places} />
      )}
    </div>
  );
};

export default FirstPage;
