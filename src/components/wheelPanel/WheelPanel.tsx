import React, { useRef, useEffect, useState } from 'react';
import Wheel from '../wheel/Wheel';
import styles from './WheelPanel.module.scss';
import { Condition, Place } from '@/types/type';

interface WheelPanelProps {
  rotation: number;
  condition: Condition;
  selectedItem: number;
  spin: () => void;
  places: Place[];
  specialMode: boolean;
}

const WheelPanel: React.FC<WheelPanelProps> = ({
  rotation,
  selectedItem,
  condition,
  spin,
  places,
  specialMode,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<DOMRect | null>(null);
  const [calcX, setCalcX] = useState(0);
  const [calcY, setCalcY] = useState(0);

  useEffect(() => {
    if (panelRef.current) {
      const newPanel = panelRef.current.getBoundingClientRect();
      setPanel(newPanel);
    }
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panel) {
      const newCalcX = (e.clientY - panel.y - panel.height / 2) / 20;
      const newCalcY = (e.clientX - panel.x - panel.width / 2) / 15;
      const percentage = ((e.clientX - panel.x) / panel.width) * 100;
      setCalcX(newCalcX);
      setCalcY(newCalcY);
      panelRef.current?.style.setProperty('--per', `${percentage}%`);
    }
  };

  const handleLeave = () => {
    setCalcX(0);
    setCalcY(0);
    panelRef.current?.style.setProperty('--per', '0%');
  };

  return (
    <div
      className={styles.container}
      onMouseMove={specialMode ? handleMove : undefined}
      onMouseLeave={specialMode ? handleLeave : undefined}
      ref={panelRef}
    >
      <div
        className={styles.wheelPanel}
        style={{ transform: `rotateX(${calcX}deg) rotateY(${calcY}deg)` }}
      >
        <div className={specialMode ? styles.transparentBg : 'absolute'}></div>
        <div className={styles.text}>
          今天就吃
          <p
            className={`w-96 text-5xl flex justify-center text-sky-950 ${
              selectedItem === -1 && styles.opacity0
            }`}
          >
            {places[selectedItem].displayName.text.split(' ')[0].split('-')[0]}
          </p>
          !
        </div>
        <Wheel rotation={rotation} condition={condition} spin={spin} places={places} />
      </div>
    </div>
  );
};

export default WheelPanel;
