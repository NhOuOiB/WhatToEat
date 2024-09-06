import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PiSpinnerBallDuotone } from 'react-icons/pi';
import { Condition } from '@/types/type';
import { BiCarousel } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { SpinnerIconGradient } from './SpinnerIconGradient';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Place } from '@/types/type';
import { Skeleton } from '@/components/ui/skeleton';

interface SettingPanelProps {
  condition: Condition;
  wheelType: string;
  specialMode: boolean;
  places: Place[];
  selectedPlaces: Place[];
  setCondition: React.Dispatch<React.SetStateAction<Condition>>;
  setWheelType: React.Dispatch<React.SetStateAction<string>>;
  setSpecialMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  fetchPlaces: () => void;
}
const SettingPanel: React.FC<SettingPanelProps> = ({
  condition,
  setCondition,
  wheelType,
  setWheelType,
  specialMode,
  setSpecialMode,
  places,
  selectedPlaces,
  setSelectedPlaces,
  fetchPlaces,
}) => {
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 2xl:w-1/4 min-[1980px]:w-1/5 h-screen md:h-5/6 p-10 flex flex-col justify-between bg-[#ffffff] rounded-3xl shadow-md ">
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-4">
          <Label htmlFor="">轉盤樣式</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className={`px-6 py-4 text-3xl relative text-gray-500 ${
                wheelType === 'wheel' && !specialMode && 'text-white'
              }`}
              onClick={() => {
                setCondition({ ...condition, ['min']: 2, ['max']: 8 });
                setWheelType('wheel');
                if (wheelType === 'wheel') setSpecialMode(!specialMode);
              }}
            >
              {wheelType === 'wheel' && specialMode ? (
                <SpinnerIconGradient />
              ) : (
                <PiSpinnerBallDuotone />
              )}
            </Button>
            <Button
              className={`px-6 py-4 text-2xl ${
                wheelType !== 'verticalWheel' ? 'text-gray-500' : ''
              }`}
              onClick={() => {
                setCondition({ ...condition, ['min']: 6, ['max']: 10 });
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
                setCondition({ ...condition, ['min']: 10, ['max']: 20 });
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
      <Dialog>
        <DialogTrigger
          className={`w-full h-10 bg-[#0f172A] text-white mb-4 flex justify-center items-center rounded-md ${
            selectedPlaces.length < condition.min && 'animate-bounce'
          }`}
          onClick={fetchPlaces}
        >
          挑選店家
        </DialogTrigger>
        <DialogContent className="h-[52rem]">
          <DialogHeader className="overflow-hidden">
            <DialogTitle className="">
              挑選喜歡的店家{' '}
              <span className="text-sm text-gray-600">
                (至少 {condition.min} ~ {condition.max} 家)
              </span>
            </DialogTitle>
            <DialogDescription className="h-full flex flex-col items-center gap-2 overflow-scroll no-scrollbar">
              {places.length === 0
                ? Array.from({ length: 20 }).map((_, index) => (
                    <div
                      className={`w-full md:w-2/3 flex justify-between items-center px-4 py-[0.65rem] rounded-md cursor-pointer transition border`}
                      key={index}
                    >
                      <Checkbox className={`bg-white text-gray-500`} />
                      <Skeleton key={index} className="w-5/6 h-5" />
                    </div>
                  ))
                : places.map((item) => {
                    const selected = selectedPlaces.some((place) => place.id === item.id);
                    return (
                      <div
                        className="w-2/3 flex justify-center items-center gap-2 relative"
                        key={item.id}
                      >
                        {item.regularOpeningHours?.openNow ? (
                          <span className="absolute flex justify-center items-center h-full w-2 left-0">
                            <span className="animate-ping absolute inline-flex h-3/4 w-full rounded-l bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-l h-full w-full bg-emerald-400"></span>
                          </span>
                        ) : (
                          <span className="absolute flex h-full w-2 left-0">
                            <span className="relative inline-flex rounded-l h-full w-full bg-gray-400"></span>
                          </span>
                        )}
                        <div
                          className={`w-full md:w-full flex justify-between items-center px-4 py-[0.65rem] rounded-md cursor-pointer transition border ${
                            selectedPlaces.length === condition.max && !selected
                              ? 'bg-gray-300 text-gray-500 border-transparent'
                              : !selected
                              ? 'bg-white text-gray-800 border border-gray-400'
                              : 'bg-gray-900 text-white border-transparent'
                          }`}
                          onClick={() => {
                            if (selectedPlaces.some((place) => place.id === item.id)) {
                              setSelectedPlaces(
                                selectedPlaces.filter((place) => place.id !== item.id)
                              );
                            } else {
                              if (selectedPlaces.length === condition.max) return;
                              setSelectedPlaces([...selectedPlaces, item]);
                            }
                          }}
                          key={item.id}
                        >
                          <Checkbox className={`bg-white text-gray-500`} checked={selected} />
                          <p className="truncate w-48 text-right">
                            {item.displayName.text.split('｜')[0].split('(')[0].split('（')[0]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingPanel;
