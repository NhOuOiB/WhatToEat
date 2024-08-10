import { FC } from 'react';

interface WheelProps {
  rotation: number;
  segments: string;
}

type wheelStyles = {
  [key: number]: {
    container: string;
    triangle: string;
    halfCircle: string;
    text: string;
  };
};

const Wheel: FC<WheelProps> = ({ rotation, segments }) => {
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
      container: 'top-[10%]',
      triangle: 'border-t-[12.71875rem] border-x-[9.25rem]',
      halfCircle: 'top-[-3.9rem] w-[18.5rem] h-[4rem]',
      text: 'top-[125%] text-xl',
    },
    6: {
      container: 'top-[7%]',
      triangle: 'border-t-[13.65rem] border-x-[7.9rem]',
      halfCircle: 'top-[-3.9rem] w-[15.8rem] h-[4rem]',
      text: 'top-[150%] text-xl',
    },
    7: {
      container: 'top-[5.25%]',
      triangle: 'border-t-[14.2rem] border-x-[6.9rem]',
      halfCircle: 'top-[-3.9rem] w-[13.8rem] h-[4rem]',
      text: 'top-[175%] text-xl',
    },
    8: {
      container: 'top-[3.8%]',
      triangle: 'border-t-[14.5rem] border-x-[6rem]',
      halfCircle: 'top-[-1.9rem] w-[12rem] h-[2rem]',
      text: 'top-[200%] text-xl',
    },
  };

  const colors = [
    { bg: 'bg-blue-900', border: 'border-t-blue-900' },
    { bg: 'bg-pink-700', border: 'border-t-pink-700' },
    { bg: 'bg-green-700', border: 'border-t-green-700' },
    { bg: 'bg-yellow-500', border: 'border-t-yellow-500' },
    { bg: 'bg-red-500', border: 'border-t-red-500' },
    { bg: 'bg-purple-500', border: 'border-t-purple-500' },
    { bg: 'bg-orange-500', border: 'border-t-orange-500' },
    { bg: 'bg-teal-500', border: 'border-t-teal-500' },
  ];

  const wheelStyle = wheelStyles[Number(segments)];
  const segmentAngle = 360 / Number(segments);

  return (
    <div className="relative w-[32rem] h-[32rem] rounded-full overflow-hidden">
      <div
        className="w-full h-full transition ease-out"
        style={{ transform: `rotate(${rotation}deg)`, transitionDuration: '3s' }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 flex justify-center">
          {Array.from({ length: Number(segments) }).map((_, index) => (
            <div
              className={`absolute ${wheelStyle?.container}`}
              style={{
                transform: `rotate(${index * segmentAngle}deg)`,
                transformOrigin: '50% 100%',
              }}
              key={index}
            >
              <div
                className={`border-b-0 border-x-transparent ${wheelStyle?.triangle} ${
                  colors[index % colors.length].border
                }`}
              ></div>
              <div
                className={`absolute right-0 rounded-t-full ${wheelStyle?.halfCircle} ${
                  colors[index % colors.length].bg
                }`}
              >
                <div
                  className={`absolute text-white rotate-180  left-[50%] transform translate-x-[-50%] font-bold ${wheelStyle?.text}`}
                >
                  test
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
