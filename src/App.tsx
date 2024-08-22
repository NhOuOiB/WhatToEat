import { FC, useEffect, useState } from 'react';
import SettingPanel from './components/settingPanel/SettingPanel';
import WheelPanel from './components/wheelPanel/WheelPanel';
import { Condition } from './types/type.ts';

const App: FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [segments, setSegments] = useState<string>('2');
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [condition, setCondition] = useState<Condition>({segments: 2, distance: 200});

  const spin = () => {
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(segments); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem + 1);
  };

  useEffect(() => {
    setSelectedItem(0);
  }, [segments]);

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-200 px-6 py-2">
      <SettingPanel setSegments={setSegments} condition={condition} setCondition={setCondition} />
      <WheelPanel
        rotation={rotation}
        condition={condition}
        selectedItem={selectedItem}
        spin={spin}
      />
    </div>
  );
};

export default App;
