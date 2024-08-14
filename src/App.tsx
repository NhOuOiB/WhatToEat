import { FC, useState } from 'react';
import Wheel from './components/Wheel';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const App: FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [segments, setSegments] = useState<string>('2');

  const spin = () => {
    const newRotation = rotation + Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);

    // const relativeRotation = newRotation % 360; // 獲取相對於一圈的角度
    // const itemAngle = 360 / Number(segments); // 每個項目的角度範圍
    // // const selectedItemIndex = Math.floor(relativeRotation / itemAngle); // 計算指針指到的項目索引
    // const selectedItem = Math.floor(relativeRotation / itemAngle);

    // console.log(`Rotation: ${newRotation}`);
    // console.log(`Relative Rotation: ${relativeRotation}`);
    // console.log(relativeRotation);
    // console.log(relativeRotation / 180);
    // console.log(`Selected Item: ${relativeRotation > 90 && relativeRotation < 270 ? 2 : 1}`);
    
    const relativeRotation = (newRotation) % 360; // 獲取相對於一圈的角度，並考慮起始角度為90度
    const itemAngle = 360 / Number(segments); // 每個項目的角度範圍
    const selectedItem = Math.floor((relativeRotation + 90) / itemAngle); // 計算指針指到的項目索引

    console.log(segments);
    console.log(`Rotation: ${newRotation}`);
    console.log(`Relative Rotation: ${relativeRotation}`);
    console.log(`Angle: ${itemAngle}`);
    console.log(`Selected Item: ${selectedItem + 1}`);
    // console.log(`Selected Item: ${relativeRotation  < 180 ? 1 : 2}`);
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
      <div className="flex flex-col items-center gap-1">
        <div className=" w-6 h-10 relative flex justify-center">
          <div className="w-0 h-full border border-sky-800 absolute"></div>
          <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.8rem] border-sky-800 absolute bottom-0"></div>
          <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.6rem] border-white absolute bottom-1"></div>
        </div>
        <Wheel rotation={rotation} segments={segments} />
      </div>
      <Button className="p-8 text-xl" onClick={spin}>
        旋轉
      </Button>
    </div>
  );
};

export default App;
