import { FC, useState, useEffect, useRef } from 'react';
import FirstPage from './page/FirstPage';
import SecondPage from './page/SecondPage';
import ThirdPage from './page/ThirdPage';
import './App.css';
import { Place } from './types/type';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../utils/config';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';

const App: FC = () => {
  // 讓滾輪更平順
  const containerRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleWheel = (event: WheelEvent) => {
  //     event.preventDefault();
  //     containerRef.current?.scrollBy({
  //       top: event.deltaY,
  //       behavior: 'smooth',
  //     });
  //   };

  //   const container = containerRef.current;
  //   container?.addEventListener('wheel', handleWheel);

  //   return () => {
  //     container?.removeEventListener('wheel', handleWheel);
  //   };
  // }, []);

  // 取得使用者位置
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  // 選中的店家
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    (async () => {
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              setLocation(location);
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
    })();
  }, []);

  // Firebase
  const app = initializeApp(JSON.parse(firebaseConfig));
  const db = getDatabase(app);

  const dbRef = ref(db, 'record');

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
  

  return (
    <div className="snap-y-mandatory no-scrollbar" ref={containerRef}>
      <FirstPage
        location={location}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        secondPageRef={secondPageRef}
      />
      <SecondPage location={location} selectedPlaces={selectedPlaces} selectedItem={selectedItem} secondPageRef={secondPageRef} />
      <ThirdPage />
      <SpeedInsights />
    </div>
  );
};

export default App;
