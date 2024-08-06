import { FC, useState } from 'react';
import Wheel from './components/Wheel';
import { Button } from '@/components/ui/button';

const App: FC = () => {
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    const newRotation = rotation + Math.floor(Math.random() * 360 + 720); // 隨機旋轉720到1080度
    setRotation(newRotation);
  };

  return (
    <div className="flex flex-col items-center">
      <Wheel rotation={rotation} />
      <Button onClick={spin}>旋轉</Button>
    </div>
  );
};

export default App;
