import { FC } from 'react';
import { Condition, Place } from '@/types/type';
import { Skeleton } from '@/components/ui/skeleton';

interface WheelProps {
  rotation: number;
  condition: Condition;
  spin: () => void;
  selectedPlaces: Place[];
}

type wheelStyles = {
  [key: number]: {
    container: string;
    triangle: string;
    halfCircle: string;
    text: string;
  };
};

const Wheel: FC<WheelProps> = ({ rotation, condition, spin, selectedPlaces }) => {
  //盤面css設定
  const wheelStyles: wheelStyles = {
                2: {
          container: 'lg: xl:top-[50%]',
          triangle: 'xl:border-t-[0rem] xl:border-x-[16rem]',
          halfCircle: 'xl:top-[-16rem] xl:w-[32rem] xl:h-[16rem]',
          text: 'xl:top-[45%] xl:text-3xl',
        },
        3: {
          container: 'xl:top-[25%]',
          triangle: 'xl:border-t-[8rem] xl:border-x-[14rem]',
          halfCircle: 'xl:top-[-7.9rem] xl:w-[28rem] xl:h-[8rem]',
          text: 'xl:top-[75%] xl:text-2xl',
        },
        4: {
          container: 'xl:top-[14.5%]',
          triangle: 'xl:border-t-[11.25rem] xl:border-x-[11.25rem]',
          halfCircle: 'xl:top-[-4.9rem] xl:w-[22.5rem] xl:h-[5rem]',
          text: 'xl:top-[100%] xl:text-2xl',
        },
        5: {
          container: 'xl:top-[9.7%]',
          triangle: 'xl:border-t-[12.71875rem] xl:border-x-[9.25rem]',
          halfCircle: 'xl:top-[-3.9697rem] xl:w-[18.5rem] xl:h-[4rem]',
          text: 'xl:top-[125%] xl:text-xl',
        },
        6: {
          container: 'xl:top-[7%]',
          triangle: 'xl:border-t-[13.65rem] xl:border-x-[7.9rem]',
          halfCircle: 'xl:top-[-3.9697rem] xl:w-[15.8rem] xl:h-[4rem]',
          text: 'xl:top-[150%] xl:text-xl',
        },
        7: {
          container: 'xl:top-[5.25%]',
          triangle: 'xl:border-t-[14.2rem] xl:border-x-[6.9rem]',
          halfCircle: 'xl:top-[-3.9697rem] xl:w-[13.8rem] xl:h-[4rem]',
          text: 'xl:top-[175%] xl:text-xl',
        },
        8: {
          container: 'xl:top-[4%]',
          triangle: 'xl:border-t-[14.5rem] xl:border-x-[6.08rem]',
          halfCircle: 'xl:top-[-1.9697rem] xl:w-[12rem] xl:h-[2rem]',
          text: 'xl:top-[200%] xl:text-xl',
        },
  };

  const wheelStyle = wheelStyles[Number(selectedPlaces?.length)];
  const segmentAngle = 360 / Number(selectedPlaces?.length);

  const colorVariants = [
    { bg: 'bg-gray-100', border: 'border-t-gray-100', text: 'text-gray-900' },
    { bg: 'bg-gray-200', border: 'border-t-gray-200', text: 'text-gray-900' },
    { bg: 'bg-gray-300', border: 'border-t-gray-300', text: 'text-gray-900' },
    { bg: 'bg-gray-400', border: 'border-t-gray-400', text: 'text-gray-900' },
    { bg: 'bg-gray-500', border: 'border-t-gray-500', text: 'text-gray-100' },
    { bg: 'bg-gray-600', border: 'border-t-gray-600', text: 'text-gray-100' },
    { bg: 'bg-gray-700', border: 'border-t-gray-700', text: 'text-gray-100' },
    { bg: 'bg-gray-800', border: 'border-t-gray-800', text: 'text-gray-100' },
  ];

  return (
    <div className="flex flex-col items-center gap-1">
      {/* 轉盤指針 */}
      <div className=" w-6 h-10 relative flex justify-center">
        <div className="w-0 h-full border border-sky-800 absolute"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.8rem] border-sky-800 absolute bottom-0"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.6rem] border-gray-200 absolute bottom-1"></div>
      </div>
      <div
        className="w-[22rem] h-[22rem] sm:w-[32rem] sm:h-[32rem] md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-full overflow-hidden shadow-md cursor-pointer"
        onClick={() => {
          if (selectedPlaces.length >= condition.min) spin();
        }}
      >
        <div
          className="w-full h-full transition ease-out"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: '3s' }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100 flex justify-center">
            {selectedPlaces?.length < condition.min ? (
              <div
                className="w-full h-full flex justify-center items-center relative"
                style={{ transform: `rotate(${360 - (rotation % 360)}deg)` }}
              >
                <div className="absolute text-5xl z-10">
                  還差 {condition.min - selectedPlaces?.length} 家
                </div>
                <Skeleton className="w-full h-full rounded-full bg-gray-100" />
              </div>
            ) : (
              Array.from({ length: selectedPlaces?.length }).map((_, index) => {
                return (
                  <div
                    className={`absolute ${wheelStyle?.container}`}
                    style={{
                      transform: `rotate(${index * segmentAngle}deg)`,
                      transformOrigin: '50% 100%',
                    }}
                    key={index}
                  >
                    <div
                      className={`border-b-0 border-x-transparent ${wheelStyle?.triangle} ${colorVariants[index].border}`}
                    ></div>
                    <div
                      className={`absolute right-0 rounded-t-full ${wheelStyle?.halfCircle} ${colorVariants[index].bg}`}
                    >
                      <div
                        className={`absolute rotate-180  left-[50%] transform translate-x-[-50%] font-bold ${wheelStyle?.text} ${colorVariants[index].text}`}
                      >
                        {selectedPlaces?.[index]?.displayName?.text?.replace(/[-:：()（）].*$/, '')}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
