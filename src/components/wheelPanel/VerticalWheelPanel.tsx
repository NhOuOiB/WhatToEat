import React from 'react';
import VerticalWheel from '../wheel/VerticalWheel';
import { Condition } from '@/types/type';
import style from './VerticalWheelPanel.module.scss';

interface VerticalWheelPanelProps {
  condition: Condition;
}

const VerticalWheelPanel: React.FC<VerticalWheelPanelProps> = ({ condition }) => {
  return (
    <div className={style.container}>
      <VerticalWheel condition={condition} />
      <div className={style.btnOut}>
        <div className={style.btnIn}></div>
      </div>
    </div>
  );
};

export default VerticalWheelPanel;
