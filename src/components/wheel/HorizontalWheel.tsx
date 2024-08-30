import React from 'react';
import { Condition, Place } from '@/types/type';

interface HorizontalWheelProps {
  condition: Condition;
  places: Place[];
}

const HorizontalWheel: React.FC<HorizontalWheelProps> = ({ condition, places }) => {
  return <div>開發中...</div>;
};

export default HorizontalWheel;
