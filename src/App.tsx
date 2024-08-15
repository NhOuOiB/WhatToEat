import { FC, useState } from 'react';
import Wheel from './components/Wheel';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const App: FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [segments, setSegments] = useState<string>('2');
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const spin = () => {
    const newRotation = rotation - Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // 計算指針指到的項目
    const itemAngle = 360 / Number(segments); // 每個項目的角度範圍
    const relativeRotation = (Math.abs(newRotation) + itemAngle / 2) % 360; // 計算多餘的旋轉角度，+ itemAngle / 2 是因為指針指到正中間
    const selectedItem = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引

    setSelectedItem(selectedItem + 1);
  };

  const reset = () => {
    setRotation(0);
    setSelectedItem(0);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <Select onValueChange={(value) => setSegments(value)} defaultValue={segments}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="選擇項目數量" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(8).keys()].map(
            (i) =>
              i !== 0 && (
                <SelectGroup key={i}>
                  <SelectItem value={`${i + 1}`}>{i + 1}</SelectItem>
                </SelectGroup>
              )
          )}
        </SelectContent>
      </Select>
      <div className={`text-6xl font-bold`}>
        抽到 <span className={`${selectedItem === 0 && 'opacity-0'}`}>{selectedItem}</span> 啦 !
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className=" w-6 h-10 relative flex justify-center">
          <div className="w-0 h-full border border-sky-800 absolute"></div>
          <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.8rem] border-sky-800 absolute bottom-0"></div>
          <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.6rem] border-white absolute bottom-1"></div>
        </div>
        <Wheel rotation={rotation} segments={segments} />
      </div>
      <div className='flex gap-6'>
        <Button className="p-8 text-xl" onClick={spin}>
          旋轉
        </Button>
        <Button className="p-8 text-xl" onClick={reset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default App;
