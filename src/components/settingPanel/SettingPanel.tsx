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
    <div className="w-full md:w-1/3 xl:w-1/4 2xl:w-1/4 min-[1980px]:w-1/5 h-5/6 p-10 flex flex-col gap-4 sm:gap-10 bg-[#ffffff] rounded-3xl shadow-md">
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
        <Label htmlFor="">轉盤內容</Label>
        <div className="grid grid-cols-4 gap-2">
          <Button className="px-6 py-4 text-md">美食</Button>
          <Button className="px-6 py-4 text-md">店家</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="count">項目數量</Label>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 min-[2560px]:grid-cols-8 gap-2">
          {[...Array(8).keys()].map(
            (i) =>
              i !== 0 && (
                <Button className="px-6 py-4 text-2xl" onClick={() => setSegments(`${i + 1}`)}>
                  {i + 1}
                </Button>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingPanel;
