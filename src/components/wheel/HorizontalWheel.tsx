import React from 'react';
import { Condition } from '@/types/type';

interface HorizontalWheelProps {
  condition: Condition;
}

const HorizontalWheel: React.FC<HorizontalWheelProps> = ({ condition }) => {
  return <div>HorizontalWheel</div>;
};

export default HorizontalWheel;
