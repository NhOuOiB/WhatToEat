import { useRef, useEffect } from 'react';
import { Condition, Place } from '@/types/type';
import style from './VerticalWheel.module.scss';

interface VerticalWheelProps {
  condition: Condition;
  itemAngle: number;
  rotateDeg: number;
  setRotateDeg: React.Dispatch<React.SetStateAction<number>>;
  places: Place[];
}

const VerticalWheel: React.FC<VerticalWheelProps> = ({
  condition,
  itemAngle,
  rotateDeg,
  setRotateDeg,
  places,
}) => {
  const translateZ = 160 / 2 / Math.tan((itemAngle / 2 / 180) * Math.PI);
  const wheelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRotateDeg(rotateDeg - (rotateDeg % itemAngle));
    wheelRef.current?.style.setProperty('transition', 'ease-in-out 0.5s');
    setTimeout(() => {
      wheelRef.current?.style.setProperty('transition', 'ease-in-out 4s');
    }, 500);
  }, [condition.segments]);
  return (
    <div className={style.container}>
      <div className={style.blur}></div>
      <div className={style.wheel} style={{ transform: `rotateX(${rotateDeg}deg)` }} ref={wheelRef}>
        {Array.from({ length: condition.segments }).map((_, index) => {
          return (
            <div
              className={style.leaf}
              style={{ transform: `rotateX(${index * itemAngle}deg) translateZ(${translateZ}px) ` }}
              key={index}
            >
              <p className="text-3xl font-extrabold">
                {places?.[index]?.displayName.text.split(' ')[0].split('-')[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalWheel;
