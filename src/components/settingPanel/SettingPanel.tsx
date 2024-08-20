import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PiSpinnerBallDuotone } from 'react-icons/pi';
import { MdRotateRight } from 'react-icons/md';
import { LuRotateCw } from 'react-icons/lu';
interface SettingPanelProps {
  spin: () => void;
  reset: () => void;
  setSegments: (segments: string) => void;
  segments: string;
}

const SettingPanel: React.FC<SettingPanelProps> = ({ spin, reset, setSegments, segments }) => {
  return (
    <div className="w-1/5 h-5/6 p-10 grid grid-cols-1 grid-rows-6 bg-[#ffffff] rounded-3xl shadow-md">
      <div>
        <Label htmlFor="">轉盤樣式</Label>
      </div>
      <div>
        <Label htmlFor="">項目數量</Label>
        <Select onValueChange={(value) => setSegments(value)} defaultValue={segments}>
          <SelectTrigger className="w-3/4 h-[2.4rem]">
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
      <div className="w-full flex justify-center gap-6">
        <Button className="px-6 py-4 text-2xl" onClick={spin}>
          <PiSpinnerBallDuotone />
        </Button>
        <Button className="px-6 py-4 text-2xl" onClick={reset}>
          <MdRotateRight />
        </Button>
      </div>
    </div>
  );
};

export default SettingPanel;
