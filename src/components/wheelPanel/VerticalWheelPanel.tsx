import React, { useEffect } from 'react';
import VerticalWheel from '../wheel/VerticalWheel';
import { Condition } from '@/types/type';
import style from './VerticalWheelPanel.module.scss';

interface VerticalWheelPanelProps {
  condition: Condition;
}

const VerticalWheelPanel: React.FC<VerticalWheelPanelProps> = ({ condition }) => {
  const [rotateDeg, setRotateDeg] = React.useState(0);
  const itemAngle = 360 / condition.segments;
  const spin = () => {
    let randomDeg = Math.random() * 360 + 360 * 5;
    randomDeg -= randomDeg % itemAngle;

    setRotateDeg(rotateDeg - randomDeg);
  };
  
  return (
    <div className={style.container}>
      <VerticalWheel condition={condition} itemAngle={itemAngle} rotateDeg={rotateDeg} setRotateDeg={setRotateDeg} />
      <div className={style.btnOut} onClick={spin}>
        <div className={style.btnIn}></div>
      </div>
    </div>
  );
};

export default VerticalWheelPanel;
