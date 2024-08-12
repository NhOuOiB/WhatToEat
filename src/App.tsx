import { FC, useState } from 'react';
import Wheel from './components/Wheel';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const App: FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [segments, setSegments] = useState<string>('2');

  const spin = () => {
    const newRotation = rotation + Math.floor(Math.random() * 360 + 3600);
    setRotation(newRotation);
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
      <div className=" w-6 h-10 relative flex justify-center">
        <div className="w-0 h-full border border-sky-800 absolute"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.8rem] border-sky-800 absolute bottom-0"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.5rem] border-white absolute bottom-1"></div>
      </div>
      <Wheel rotation={rotation} segments={segments} />
      <Button className="p-8 text-xl" onClick={spin}>
        旋轉
      </Button>
    </div>
  );
};

export default App;
