import React from 'react';
import HorizontalWheel from '../wheel/HorizontalWheel';
import { Condition } from '@/types/type';

interface HorizontalWheelPanelProps {
  condition: Condition;
}

const HorizontalWheelPanel: React.FC<HorizontalWheelPanelProps> = ({ condition }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/2 2xl:w-1/2 min-[1980px]:w-1/3 h-5/6 shadow rounded-3xl flex justify-center items-center">
      <HorizontalWheel condition={condition} />
    </div>
  );
};

export default HorizontalWheelPanel;
