import React from 'react';
import HorizontalWheel from '../wheel/HorizontalWheel';
import { Condition, Place } from '@/types/type';
import style from './HorizontalWheelPanel.module.scss';

interface HorizontalWheelPanelProps {
  condition: Condition;
  places: Place[];
}

const HorizontalWheelPanel: React.FC<HorizontalWheelPanelProps> = ({ condition, places }) => {
  return (
    <div className={style.container}>
      <HorizontalWheel condition={condition} places={places} />
    </div>
  );
};

export default HorizontalWheelPanel;
