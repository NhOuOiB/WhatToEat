import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SettingPanelProps {
  spin: () => void;
  reset: () => void;
  setSegments: (segments: string) => void;
  segments: string;
}

const SettingPanel: React.FC<SettingPanelProps> = ({ spin, reset, setSegments, segments }) => {
  return (
    <div className="w-1/4 h-5/6 flex flex-col justify-center items-center bg-white rounded-3xl shadow-md">
      <div>
        <Label htmlFor="">項目數量</Label>
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
      </div>
      <div className="flex gap-6">
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

export default SettingPanel;
