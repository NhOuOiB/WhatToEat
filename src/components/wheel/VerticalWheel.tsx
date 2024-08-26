import React from 'react';
import { Condition } from '@/types/type';
import style from './VerticalWheel.module.scss';

interface VerticalWheelProps {
  condition: Condition;
}

const VerticalWheel: React.FC<VerticalWheelProps> = ({ condition }) => {
  const itemAngle = 360 / condition.segments;
  const translateZ = 160 / 2 / Math.tan((itemAngle / 2 / 180) * Math.PI);
  const rotate = (Math.random() * 360) + (360 * 5)
  return (
    <div className="w-3/4 h-2/3 flex justify-center items-center bg-black">
      <div className={style.container} style={{transform: ` rotateY(-15deg)`}}>
        {Array.from({ length: condition.segments }).map((_, index) => {
          return (
            <div
              className={style.wheel}
              style={{ transform: `rotateX(${index * itemAngle}deg) translateZ(${translateZ}px) ` }}
              key={index}
            >
              <p>{index + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalWheel;
