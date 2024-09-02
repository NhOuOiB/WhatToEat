import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PiSpinnerBallDuotone } from 'react-icons/pi';
import { Condition } from '@/types/type';
import { BiCarousel } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { SpinnerIconGradient } from './SpinnerIconGradient';

interface SettingPanelProps {
  condition: Condition;
  wheelType: string;
  specialMode: boolean;
  setCondition: React.Dispatch<React.SetStateAction<Condition>>;
  setWheelType: React.Dispatch<React.SetStateAction<string>>;
  setSpecialMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const SettingPanel: React.FC<SettingPanelProps> = ({
  condition,
  setCondition,
  wheelType,
  setWheelType,
  specialMode,
  setSpecialMode,
}) => {
  const segmentCount = wheelType === 'wheel' ? 8 : wheelType === 'verticalWheel' ? 10 : 20;
  const aboveSegmentCount = wheelType === 'wheel' ? 1 : wheelType === 'verticalWheel' ? 5 : 10;
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 2xl:w-1/4 min-[1980px]:w-1/5 h-5/6 p-10 flex flex-col gap-4 sm:gap-10 bg-[#ffffff] rounded-3xl shadow-md">
      <div className="flex flex-col gap-4">
        <Label htmlFor="">轉盤樣式</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={`px-6 py-4 text-3xl ${wheelType !== 'wheel' && 'text-gray-500'}`}
            onClick={() => {
              setCondition({ ...condition, ['segments']: 2 });
              setWheelType('wheel');
              if (wheelType === 'wheel') setSpecialMode(!specialMode);
            }}
          >
            <SpinnerIconGradient specialMode={specialMode} />
            <IconContext.Provider value={{ className: `transition ${!specialMode ? 'opacity-100' : 'opacity-0'}` }}>
              <PiSpinnerBallDuotone />
            </IconContext.Provider>
          </Button>
          <Button
            className={`px-6 py-4 text-2xl ${wheelType !== 'verticalWheel' ? 'text-gray-500' : ''}`}
            onClick={() => {
              setCondition({ ...condition, ['segments']: 6 });
              setWheelType('verticalWheel');
            }}
          >
            <IconContext.Provider value={{ className: 'rotate-90' }}>
              <BiCarousel />
            </IconContext.Provider>
          </Button>
          <Button
            className={`px-6 py-4 text-2xl ${
              wheelType !== 'horizontalWheel' ? 'text-gray-500' : ''
            }`}
            onClick={() => {
              setCondition({ ...condition, ['segments']: 11 });
              setWheelType('horizontalWheel');
            }}
          >
            <BiCarousel />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="">優先順序</Label>
        <div className="grid grid-cols-4 gap-2">
          <Button
            className={`px-6 py-4 text-md ${
              condition.rankPreference !== 'POPULARITY' && 'text-gray-500'
            }`}
            onClick={() => setCondition({ ...condition, ['rankPreference']: 'POPULARITY' })}
          >
            評分
          </Button>
          <Button
            className={`px-6 py-4 text-md ${
              condition.rankPreference !== 'DISTANCE' && 'text-gray-500'
            }`}
            onClick={() => setCondition({ ...condition, ['rankPreference']: 'DISTANCE' })}
          >
            距離
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="count">項目數量</Label>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 min-[2560px]:grid-cols-8 gap-2">
          {[...Array(segmentCount).keys()].map(
            (i) =>
              i + 1 > aboveSegmentCount && (
                <Button
                  className={`px-6 py-4 text-2xl ${
                    condition.segments - 1 === i ? 'text-white' : 'text-gray-500'
                  }`}
                  onClick={() => setCondition({ ...condition, ['segments']: i + 1 })}
                  key={i}
                >
                  {i + 1}
                </Button>
              )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="count">店家距離</Label>
          <span className="text-sm">{condition.distance} m</span>
        </div>
        <Slider
          value={[condition.distance]}
          max={10000}
          min={500}
          step={500}
          onValueChange={(value) => setCondition({ ...condition, ['distance']: value[0] })}
        />
      </div>
    </div>
  );
};

export default SettingPanel;
