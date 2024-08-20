import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PiSpinnerBallDuotone } from 'react-icons/pi';
import { TfiViewList } from 'react-icons/tfi';

interface SettingPanelProps {
  setSegments: (segments: string) => void;
  segments: string;
}

const SettingPanel: React.FC<SettingPanelProps> = ({ setSegments, segments }) => {
  return (
    <div className="w-1/5 h-5/6 p-10 grid grid-cols-1 grid-rows-7 bg-[#ffffff] rounded-3xl shadow-md">
      <div className="flex flex-col gap-4">
        <Label htmlFor="">轉盤樣式</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button className="px-6 py-4 text-3xl">
            <PiSpinnerBallDuotone />
          </Button>
          <Button className="px-6 py-4 text-2xl">
            <TfiViewList />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="">轉盤樣式</Label>
        <div className="grid grid-cols-8 gap-2">
          <Button className="px-6 py-4 text-2xl">1</Button>
          <Button className="px-6 py-4 text-2xl">2</Button>
          <Button className="px-6 py-4 text-2xl">3</Button>
          <Button className="px-6 py-4 text-2xl">4</Button>
          <Button className="px-6 py-4 text-2xl">5</Button>
          <Button className="px-6 py-4 text-2xl">6</Button>
          <Button className="px-6 py-4 text-2xl">7</Button>
          <Button className="px-6 py-4 text-2xl">8</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="count">項目數量</Label>
        <Select onValueChange={(value) => setSegments(value)} defaultValue={segments}>
          <SelectTrigger id="count" className="w-3/4 h-[2.4rem]">
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
      </div>
    </div>
  );
};

export default SettingPanel;
