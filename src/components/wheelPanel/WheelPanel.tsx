import React, { useRef, useEffect, useState } from 'react';
import Wheel from '../wheel/Wheel';
import styles from './WheelPanel.module.scss';

interface WheelPanelProps {
  rotation: number;
  segments: string;
  selectedItem: number;
}

const WheelPanel: React.FC<WheelPanelProps> = ({ rotation, selectedItem, segments }) => {
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
      setCalcX(newCalcX);
      setCalcY(newCalcY);
    }
  };

  const handleLeave = () => {
    setCalcX(0);
    setCalcY(0);
  };

  return (
    <div className={styles.container} onMouseMove={handleMove} onMouseLeave={handleLeave} ref={panelRef}>
      <div className={styles.wheelPanel} style={{ transform: `rotateX(${calcX}deg) rotateY(${calcY}deg)` }}>
        <div className={styles.transparentBg}></div>
        <div className={styles.text}>
          抽到 <span className={selectedItem === 0 ? styles.opacity0 : ''}>{selectedItem}</span> 啦 !
        </div>
        <Wheel rotation={rotation} segments={segments} />
      </div>
    </div>
  );
};

export default WheelPanel;