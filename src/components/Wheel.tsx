import { FC, useState, useEffect } from 'react';

interface WheelProps {
  rotation: number;
  segments: string;
}

type Lengths = {
  [key: number]: {
    borderT: string;
    borderX: string;
    top: string;
    textTop: string;
    textLeft: string;
    circleTop: string;
    circleW: string;
    circleH: string;
  };
};

const Wheel: FC<WheelProps> = ({ rotation, segments }) => {
  //盤面css設定
  const lengths: Lengths = {
    2: {
      borderT: 'border-t-[0rem]',
      borderX: 'border-x-[16rem]',
      top: 'top-[50%]',
      textTop: 'top-[40%]',
      textLeft: 'left-[46.75%]',
      circleTop: 'top-[-16rem]',
      circleW: 'w-[32rem]',
      circleH: 'h-[16rem]',
    },
    3: {
      borderT: 'border-t-[8rem]',
      borderX: `border-x-[${8 * 1.75}rem]`,
      top: 'top-[25%]',
      textTop: 'top-[75%]',
      textLeft: 'left-[50%]',
      circleTop: 'top-[-7.9rem]',
      circleW: 'w-[28rem]',
      circleH: 'h-[8rem]',
    },
    4: {
      borderT: 'border-t-[11.25rem]',
      borderX: 'border-x-[11.25rem]',
      top: 'top-[14.5%]',
      textTop: 'top-[100%]',
      textLeft: 'left-[50%]',
      circleTop: 'top-[-4.9rem]',
      circleW: 'w-[22.5rem]',
      circleH: 'h-[5rem]',
    },
    5: {
      borderT: `border-t-[${9.25 * 1.375}rem]`,
      borderX: 'border-x-[9.25rem]',
      top: 'top-[10%]',
      textTop: 'top-[125%]',
      textLeft: 'left-[50%]',
      circleTop: 'top-[-3.9rem]',
      circleW: 'w-[18.5rem]',
      circleH: 'h-[4rem]',
    },
    6: {
      borderT: `border-t-[13.65rem]`,
      borderX: 'border-x-[7.9rem]',
      top: 'top-[7%]',
      textTop: 'top-[150%]',
      textLeft: 'left-[50%]',
      circleTop: 'top-[-3.9rem]',
      circleW: 'w-[15.8rem]',
      circleH: 'h-[4rem]',
    },
    7: {
      borderT: `border-t-[14.2rem]`,
      borderX: 'border-x-[6.9rem]',
      top: 'top-[5.25%]',
      textTop: 'top-[175%]',
      textLeft: 'left-[50%]',
      circleTop: 'top-[-3.9rem]',
      circleW: 'w-[13.8rem]',
      circleH: 'h-[4rem]',
    },
    8: {
      borderT: `border-t-[14.6rem]`,
      borderX: 'border-x-[6rem]',
      top: 'top-[3.8%]',
      textTop: 'top-[200%]',
      textLeft: 'left-[45%]',
      circleTop: 'top-[-1.9rem]',
      circleW: 'w-[12rem]',
      circleH: 'h-[2rem]',
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

  const length = lengths[Number(segments)];
  const segmentAngle = 360 / Number(segments);

  return (
    <div className="relative w-[32rem] h-[32rem] rounded-full overflow-hidden">
      <div
        className="w-full h-full transition ease-out"
        style={{ transform: `rotate(${rotation}deg)`, transitionDuration: '3s' }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 flex justify-center">
          {Array.from({ length: Number(segments) }).map(
            (_, index) => (
              console.log(length),
              (
                // (
                //   <div
                //     className={`absolute`}
                //     style={{
                //       transform: `rotate(${index * segmentAngle}deg)`,
                //       transformOrigin: '50% 100%',
                //       top: '50%',
                //     }}
                //     key={index}
                //   >
                //     <div
                //       className={`border-t-[0rem] border-b-0 border-x-[16rem] border-x-transparent ${
                //         colors[index % colors.length].border
                //       }`}
                //     ></div>
                //     <div
                //       className={`absolute right-0 top-[-16rem] w-[32rem] h-[16rem] rounded-t-full ${
                //         colors[index % colors.length].bg
                //       }`}
                //     >
                //       <div className={`absolute text-white top-[50%] left-[47.5%] rotate-180`}>test</div>
                //     </div>
                //   </div>
                // )
                <div
                  className={`absolute ${length?.top}`}
                  style={{
                    transform: `rotate(${index * segmentAngle}deg)`,
                    transformOrigin: '50% 100%',
                  }}
                  key={index}
                >
                  <div
                    className={`${length?.borderT} border-b-0 ${length?.borderX} border-x-transparent ${
                      colors[index % colors.length].border
                    }`}
                  ></div>
                  <div
                    className={`absolute right-0 ${length?.circleTop} ${length?.circleW} ${
                      length?.circleH
                    } rounded-t-full ${colors[index % colors.length].bg}`}
                  >
                    <div className={`absolute text-white ${length?.textTop} ${length?.textLeft} rotate-180`}>test</div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
