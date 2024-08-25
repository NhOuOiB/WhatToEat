import React from 'react';
import VerticalWheel from '../wheel/VerticalWheel';
import { Condition } from '@/types/type';

interface VerticalWheelPanelProps {
  condition: Condition;
}

const VerticalWheelPanel: React.FC<VerticalWheelPanelProps> = ({ condition }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/2 2xl:w-1/2 min-[1980px]:w-1/3 h-5/6 shadow rounded-3xl flex justify-center items-center">
      <VerticalWheel condition={condition} />
    </div>
  );
};

export default VerticalWheelPanel;
