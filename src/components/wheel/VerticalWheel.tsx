import { useRef, useEffect } from 'react';
import { Condition, Place } from '@/types/type';
import style from './VerticalWheel.module.scss';
import { Skeleton } from '@/components/ui/skeleton';

interface VerticalWheelProps {
  itemAngle: number;
  rotateDeg: number;
  setRotateDeg: React.Dispatch<React.SetStateAction<number>>;
  selectedPlaces: Place[];
  condition: Condition;
}

const VerticalWheel: React.FC<VerticalWheelProps> = ({
  itemAngle,
  rotateDeg,
  setRotateDeg,
  selectedPlaces,
  condition,
}) => {
  const translateZ = 160 / 2 / Math.tan((itemAngle / 2 / 180) * Math.PI);
  const wheelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRotateDeg(rotateDeg - (rotateDeg % itemAngle));
    wheelRef.current?.style.setProperty('transition', 'ease-in-out 0.5s');
    setTimeout(() => {
      wheelRef.current?.style.setProperty('transition', 'ease-in-out 4s');
    }, 500);
  }, [selectedPlaces.length]);
  return (
    <div className={style.container}>
      <div className={style.blur}></div>
      <div className={style.wheel} style={{ transform: `rotateX(${rotateDeg}deg)` }} ref={wheelRef}>
        {selectedPlaces.length < condition.min ? (
          <div className={style.leaf}>
            <Skeleton className="w-full h-full bg-yellow-50" />
          </div>
        ) : (
          Array.from({ length: selectedPlaces.length }).map((_, index) => {
            return (
              <div
                className={style.leaf}
                style={{
                  transform: `rotateX(${index * itemAngle}deg) translateZ(${translateZ}px) `,
                }}
                key={index}
              >
                <p className="text-3xl font-extrabold">
                  {selectedPlaces?.[index]?.displayName.text.split(' ')[0].split('-')[0]}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VerticalWheel;
