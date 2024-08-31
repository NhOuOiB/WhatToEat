import { FC } from 'react';
import { Condition, Place } from '@/types/type';

interface WheelProps {
  rotation: number;
  condition: Condition;
  spin: () => void;
  places: Place[];
}

type wheelStyles = {
  [key: number]: {
    container: string;
    triangle: string;
    halfCircle: string;
    text: string;
  };
};

const Wheel: FC<WheelProps> = ({ rotation, condition, spin, places }) => {
  //盤面css設定
  const wheelStyles: wheelStyles = {
    2: {
      container: 'top-[50%]',
      triangle: 'border-t-[0rem] border-x-[16rem]',
      halfCircle: 'top-[-16rem] w-[32rem] h-[16rem]',
      text: 'top-[45%] text-3xl',
    },
    3: {
      container: 'top-[25%]',
      triangle: 'border-t-[8rem] border-x-[14rem]',
      halfCircle: 'top-[-7.9rem] w-[28rem] h-[8rem]',
      text: 'top-[75%] text-2xl',
    },
    4: {
      container: 'top-[14.5%]',
      triangle: 'border-t-[11.25rem] border-x-[11.25rem]',
      halfCircle: 'top-[-4.9rem] w-[22.5rem] h-[5rem]',
      text: 'top-[100%] text-2xl',
    },
    5: {
      container: 'top-[9.7%]',
      triangle: 'border-t-[12.71875rem] border-x-[9.25rem]',
      halfCircle: 'top-[-3.9697rem] w-[18.5rem] h-[4rem]',
      text: 'top-[125%] text-xl',
    },
    6: {
      container: 'top-[7%]',
      triangle: 'border-t-[13.65rem] border-x-[7.9rem]',
      halfCircle: 'top-[-3.9697rem] w-[15.8rem] h-[4rem]',
      text: 'top-[150%] text-xl',
    },
    7: {
      container: 'top-[5.25%]',
      triangle: 'border-t-[14.2rem] border-x-[6.9rem]',
      halfCircle: 'top-[-3.9697rem] w-[13.8rem] h-[4rem]',
      text: 'top-[175%] text-xl',
    },
    8: {
      container: 'top-[4%]',
      triangle: 'border-t-[14.5rem] border-x-[6.08rem]',
      halfCircle: 'top-[-1.9697rem] w-[12rem] h-[2rem]',
      text: 'top-[200%] text-xl',
    },
  };

  const wheelStyle = wheelStyles[Number(condition.segments)];
  const segmentAngle = 360 / Number(condition.segments);

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
        className="w-[32rem] h-[32rem] rounded-full overflow-hidden shadow-md cursor-pointer"
        onClick={spin}
      >
        <div
          className="w-full h-full transition ease-out"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: '3s' }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100 flex justify-center">
            {Array.from({ length: condition.segments }).map((_, index) => {
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
                      {places?.[index]?.displayName.text.split(' ')[0].split('-')[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
