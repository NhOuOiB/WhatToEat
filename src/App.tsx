import { FC, useEffect, useState } from 'react';
import SettingPanel from './components/settingPanel/SettingPanel';
import WheelPanel from './components/wheelPanel/WheelPanel';
import VerticalWheelPanel from './components/wheelPanel/VerticalWheelPanel.tsx';
import HorizontalWheelPanel from './components/wheelPanel/HorizontalWheelPanel.tsx';
import { Condition } from './types/type.ts';

const App: FC = () => {
  const [condition, setCondition] = useState<Condition>({ segments: 2, distance: 2000 });
  const [wheelType, setWheelType] = useState<string>('verticalWheel');

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

  useEffect(() => {
    setSelectedItem(0);
  }, [condition.segments]);

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-200 px-6 py-2">
      <SettingPanel
        condition={condition}
        setCondition={setCondition}
        wheelType={wheelType}
        setWheelType={setWheelType}
      />
      {wheelType === 'wheel' ? (
        <WheelPanel rotation={rotation} condition={condition} selectedItem={selectedItem} spin={spin} />
      ) : wheelType === 'verticalWheel' ? (
        <VerticalWheelPanel condition={condition} />
      ) : (
        <HorizontalWheelPanel condition={condition} />
      )}
    </div>
  );
};

export default App;
