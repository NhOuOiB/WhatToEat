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
      container: 'top-[50%]',
      triangle:
        'border-x-[11rem] sm:border-x-[16rem] md:border-x-[11rem] lg:border-x-[14rem] xl:border-x-[16rem] border-t-[0rem]',
      halfCircle:
        'top-[-11rem] w-[22rem] h-[11rem] sm:top-[-16rem] sm:w-[32rem] sm:h-[16rem] md:top-[-11rem] md:w-[22rem] md:h-[11rem] lg:top-[-14rem] lg:w-[28rem] lg:h-[14rem] xl:top-[-16rem] xl:w-[32rem] xl:h-[16rem]',
      text: 'top-[50%] text-xl sm:top-[45%] sm:text-3xl md:top-[50%] md:text-2xl lg:top-[50%] lg:text-2xl xl:top-[45%] xl:text-3xl',
    },
    3: {
      container: 'top-[25%]',
      triangle:
        'border-t-[5.425rem] border-x-[9.4rem] sm:border-t-[8rem] sm:border-x-[14rem] md:border-t-[5.425rem] md:border-x-[9.4rem] lg:border-t-[6.9rem] lg:border-x-[12rem] xl:border-t-[8rem] xl:border-x-[14rem]',
      halfCircle:
        'top-[-5.7rem] w-[18.8rem] h-[5.8rem] sm:top-[-7.9rem] sm:w-[28rem] sm:h-[8rem] md:top-[-5.7rem] md:w-[18.8rem] md:h-[5.8rem] lg:top-[-6.9rem] lg:w-[24rem] lg:h-[7rem] xl:top-[-7.9rem] xl:w-[28rem] xl:h-[8rem]',
      text: 'top-[60%] text-xl sm:top-[60%] sm:text-xl md:top-[60%] md:text-xl lg:top-[75%] lg:text-xl xl:top-[75%] xl:text-2xl',
    },
    4: {
      container: 'top-[14%] sm:top-[14.5%] md:top-[14%] lg:top-[14.5%] xl:top-[14.5%]',
      triangle:
        'border-t-[7.8rem] border-x-[7.8rem] sm:border-t-[11.25rem] sm:border-x-[11.25rem] md:border-t-[7.8rem] md:border-x-[7.8rem] lg:border-t-[9.8rem] lg:border-x-[9.8rem] xl:border-t-[11.25rem] xl:border-x-[11.25rem]',
      halfCircle:
        'top-[-3.3rem] w-[15.6rem] h-[3.4rem] sm:top-[-4.9rem] sm:w-[22.5rem] sm:h-[5rem] md:top-[-3.3rem] md:w-[15.6rem] md:h-[3.4rem] lg:top-[-4.2rem] lg:w-[19.5rem] lg:h-[4.3rem] xl:top-[-4.9rem] xl:w-[22.5rem] xl:h-[5rem]',
      text: 'top-[100%] text-md sm:top-[100%] sm:text-2xl md:top-[100%] md:text-md lg:top-[100%] lg:text-xl xl:top-[100%] xl:text-2xl',
    },
    5: {
      container: 'top-[9.3%] sm:top-[9.7%] md:top-[9.3%] lg:top-[9.8%] xl:top-[9.7%]',
      triangle:
        'border-t-[8.8rem] border-x-[6.4rem] sm:border-t-[12.71875rem] sm:border-x-[9.25rem] md:border-t-[8.8rem] md:border-x-[6.4rem] lg:border-t-[11.12rem] lg:border-x-[8.1rem] xl:border-t-[12.71875rem] xl:border-x-[9.25rem]',
      halfCircle:
        'top-[-2.1rem] w-[12.8rem] h-[2.2rem] sm:top-[-3.9697rem] sm:w-[18.5rem] sm:h-[4rem] md:top-[-2.1rem] md:w-[12.8rem] md:h-[2.2rem] lg:top-[-2.8rem] lg:w-[16.2rem] lg:h-[2.9rem] xl:top-[-3.9697rem] xl:w-[18.5rem] xl:h-[4rem]',
      text: 'top-[150%] text-sm sm:top-[125%] sm:text-xl md:top-[150%] md:text-sm lg:top-[140%] lg:text-lg xl:top-[125%] xl:text-xl',
    },
    6: {
      container: 'top-[7%]',
      triangle:
        'border-t-[9.25rem] border-x-[5.4rem] sm:border-t-[13.65rem] sm:border-x-[7.9rem] md:border-t-[9.25rem] md:border-x-[5.4rem] lg:border-t-[11.9rem] lg:border-x-[6.9rem] xl:border-t-[13.65rem] xl:border-x-[7.9rem]',
      halfCircle:
        'top-[-1.56rem] w-[10.8rem] h-[1.6rem] sm:top-[-3.9697rem] sm:w-[15.8rem] sm:h-[4rem] md:top-[-1.56rem] md:w-[10.8rem] md:h-[1.6rem] lg:top-[-1.9697rem] lg:w-[13.8rem] lg:h-[2rem] xl:top-[-3.9697rem] xl:w-[15.8rem] xl:h-[4rem]',
      text: 'top-[175%] text-sm sm:top-[150%] sm:text-xl md:top-[175%] md:text-sm lg:top-[190%] lg:text-lg xl:top-[150%] xl:text-xl',
    },
    7: {
      container: 'top-[4.8%] sm:top-[5.25%] md:top-[4.8%] lg:top-[5.25%] xl:top-[5.25%]',
      triangle:
        'border-t-[9.8rem] border-x-[4.75rem] sm:border-t-[14.2rem] sm:border-x-[6.9rem] md:border-t-[9.8rem] md:border-x-[4.75rem] lg:border-t-[12.4rem] lg:border-x-[6rem] xl:border-t-[14.2rem] xl:border-x-[6.9rem]',
      halfCircle:
        'top-[-1rem] w-[9.5rem] h-[1.1rem] sm:top-[-3.9697rem] sm:w-[13.8rem] sm:h-[4rem] md:top-[-1rem] md:w-[9.5rem] md:h-[1.1rem] lg:top-[-1.4697rem] lg:w-[12rem] lg:h-[1.5rem] xl:top-[-3.9697rem] xl:w-[13.8rem] xl:h-[4rem]',
      text: 'top-[200%] text-sm sm:top-[175%] sm:text-xl md:top-[200%] md:text-sm lg:top-[170%] lg:text-md xl:top-[175%] xl:text-xl',
    },
    8: {
      container: 'top-[3.25%] sm:top-[4%] md:top-[3.25%] lg:top-[4%] xl:top-[4%]',
      triangle:
        'border-t-[10rem] border-x-[4.4rem] sm:border-t-[14.5rem] sm:border-x-[6.08rem] md:border-t-[10rem] md:border-x-[4.4rem] lg:border-t-[12.7rem] lg:border-x-[5.4rem] xl:border-t-[14.5rem] xl:border-x-[6.08rem]',
      halfCircle:
        'top-[-0.96rem] w-[8.8rem] h-[1rem] sm:top-[-1.9697rem] sm:w-[12rem] sm:h-[2rem] md:top-[-0.96rem] md:w-[8.8rem] md:h-[1rem] lg:top-[-1.16rem] lg:w-[10.8rem] lg:h-[1.2rem] xl:top-[-1.9697rem] xl:w-[12rem] xl:h-[2rem]',
      text: 'top-[250%] text-sm sm:top-[200%] sm:text-xl md:top-[250%] md:text-sm lg:top-[280%] lg:text-md xl:top-[200%] xl:text-xl',
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
    <div className="max-h-full flex flex-col items-center gap-1">
      {/* 轉盤指針 */}
      <div className=" w-6 min-h-10 relative flex justify-center">
        <div className="w-0 h-full border border-sky-800 absolute"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.8rem] border-sky-800 absolute bottom-0"></div>
        <div className="w-full border border-b-0 border-x-[0.8rem] border-x-transparent border-t-[.6rem] border-gray-200 absolute bottom-1"></div>
      </div>
      <div
        className="w-[22rem] min-h-[22rem] sm:w-[32rem] sm:min-h-[32rem] md:w-[22rem] md:min-h-[22rem] lg:w-[28rem] lg:min-h-[28rem] xl:w-[32rem] xl:min-h-[32rem] rounded-full overflow-hidden shadow-md cursor-pointer"
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
                        className={`w-2/3 absolute rotate-180 left-[50%] transform translate-x-[-50%] font-bold truncate text-center ${wheelStyle?.text} ${colorVariants[index].text}`}
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
