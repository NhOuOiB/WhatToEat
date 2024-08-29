import { FC, useEffect, useState } from 'react';
import SettingPanel from '../components/settingPanel/SettingPanel';
import WheelPanel from '../components/wheelPanel/WheelPanel';
import VerticalWheelPanel from '../components/wheelPanel/VerticalWheelPanel.tsx';
import HorizontalWheelPanel from '../components/wheelPanel/HorizontalWheelPanel.tsx';
import { Condition } from '../types/type.ts';
import axios from 'axios';
import { google_key } from '../../utils/config.ts';

const FirstPage: FC = () => {
  const [wheelType, setWheelType] = useState<string>('verticalWheel');
  const [condition, setCondition] = useState<Condition>({
    segments: wheelType === 'wheel' ? 2 : wheelType === 'verticalWheel' ? 6 : 11,
    distance: 2000,
  });

  // Wheel
  const [rotation, setRotation] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const spin = () => {
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(condition.segments); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem + 1);
  };

  // Google Places API

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  function showPosition(position: GeolocationPosition) {
    console.log('緯度: ' + position.coords.latitude);
    console.log('經度: ' + position.coords.longitude);
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    // 在這裡您可以將 position.coords.latitude 和 position.coords.longitude 傳給 Axios 請求
  }

  function showError(error: GeolocationPositionError) {
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
  }

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log('瀏覽器不支援地理定位。');
    }
  };

  const fetchData = async () => {
    getLocation();
    console.log(location);
        const data = {
      includedTypes: ['restaurant'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: location,
          radius: 1000.0,
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
    console.log(response.data);
  };

  useEffect(() => {
    setSelectedItem(0);
  }, [condition.segments]);
  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-200 px-6 py-2 snap-start">
      <div
        className="p-2 border border-gray-800 rounded-lg cursor-pointer shadow-md hover:bg-gray-800 hover:text-white hover:shadow-xl trnasition duration-500 hover:scale-110"
        onClick={fetchData}
      >
        click
      </div>
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
        />
      ) : wheelType === 'verticalWheel' ? (
        <VerticalWheelPanel condition={condition} />
      ) : (
        <HorizontalWheelPanel condition={condition} />
      )}
    </div>
  );
};

export default FirstPage;
