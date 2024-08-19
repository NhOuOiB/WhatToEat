import React from 'react'
import Wheel from './Wheel';

interface WheelPanelProps {
    rotation: number;
    segments: string;
    selectedItem: number;
    }

const WheelPanel: React.FC<WheelPanelProps> = ({rotation, selectedItem, segments}) => {
  return (
    <div className="wheel-panel">
      <div className="transparent-bg"></div>
      <div className={`text-6xl font-bold z-10`}>
        抽到 <span className={`${selectedItem === 0 && 'opacity-0'}`}>{selectedItem}</span> 啦 !
      </div>
      <Wheel rotation={rotation} segments={segments} />
    </div>
  );
};

export default WheelPanel