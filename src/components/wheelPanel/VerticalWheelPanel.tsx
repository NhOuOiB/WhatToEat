import React from 'react';
import VerticalWheel from '../wheel/VerticalWheel';
import { Condition, Place } from '@/types/type';
import style from './VerticalWheelPanel.module.scss';

interface VerticalWheelPanelProps {
  condition: Condition;
  selectedPlaces: Place[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  secondPageRef: React.RefObject<HTMLDivElement>;
}

const VerticalWheelPanel: React.FC<VerticalWheelPanelProps> = ({
  condition,
  selectedPlaces,
  setSelectedItem,
  secondPageRef,
}) => {
  const [rotateDeg, setRotateDeg] = React.useState(0);
  const itemAngle = 360 / selectedPlaces.length;
  const spin = () => {
    let randomDeg = Math.random() * 360 + 360 * 5;
    randomDeg -= randomDeg % itemAngle;
    const newRotateDeg = rotateDeg - randomDeg;

    setRotateDeg(newRotateDeg);
    setSelectedItem(Math.abs((newRotateDeg / itemAngle) % selectedPlaces.length));

    setTimeout(() => {
      secondPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 5000);
  };

  return (
    <div className={style.container}>
      <VerticalWheel
        itemAngle={itemAngle}
        rotateDeg={rotateDeg}
        setRotateDeg={setRotateDeg}
        selectedPlaces={selectedPlaces}
        condition={condition}
      />
      <div
        className={style.btnOut}
        onClick={() => {
          if (selectedPlaces.length >= condition.min) spin();
        }}
      >
        <div className={style.btnIn}></div>
      </div>
    </div>
  );
};

export default VerticalWheelPanel;
