import { FC } from 'react';

interface WheelProps {
  rotation: number;
  segments: number;
}

const Wheel: FC<WheelProps> = ({ rotation, segments = 8 }) => {
  const segmentAngle = 360 / segments;
  const colors = [
    'bg-blue-900',
    'bg-pink-700',
    'bg-green-700',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-teal-500',
  ];

  const getSegmentClass = (segments: number) => {
    if (segments === 1) {
      return 'w-full h-full rounded-full';
    } else if (segments === 2) {
      return 'w-full h-1/2 rounded-ss-full';
    } else {
      return 'w-1/2 h-1/2 rounded-ss-full';
    }
  };

  const getSkewY = (segments: number) => {
    if (segments === 2) {
      return '0deg';
    } else if (segments === 3) {
      return '-30deg';
    } else if (segments === 4) {
      return '0deg';
    } else if (segments === 5) {
      return '15deg';
    } else if (segments === 6) {
      return '30deg';
    } else if (segments === 7) {
      return '38.5deg';
    } else if (segments === 8) {
      return '45deg';
    } else {
      return '0deg';
    }
  };

  const textAngle = () => {
    if (segments === 2) {
      return 0;
    } else if (segments === 3) {
      return 132;
    } else if (segments === 4) {
      return 135;
    } else if (segments === 5) {
      return 130;
    } else if (segments === 6) {
      return 127.5;
    } else if (segments === 7) {
      return 125;
    } else if (segments === 8) {
      return '45deg';
    } else {
      return 0;
    }
  };

  return (
    <div className="relative w-[32rem] h-[32rem] rounded-full overflow-hidden">
      <div
        className="w-full h-full transition ease-out"
        style={{ transform: `rotate(${rotation}deg)`, transitionDuration: '3s' }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800">
          {Array.from({ length: segments }).map(
            (_, index) => (
              console.log(index * segmentAngle),
              (
                <div
                  key={index}
                  className={`absolute ${colors[index % colors.length]} ${getSegmentClass(
                    segments
                  )} text-white text-2xl flex justify-center items-center`}
                  style={{
                    transform: `rotate(${index * segmentAngle}deg) skewY(${getSkewY(segments)}) skewX(153.5deg) ${
                      segments === 3 ? 'scale(1.325)' : 'scale(.7)'
                    }`,
                    transformOrigin: segments > 2 ? '100% 100%' : '50% 100%',
                  }}
                >
                  <div className='absolute w-full flex justify-center' style={{ transform: `rotate(${textAngle()}deg) skewX(-6deg) ${segments === 3 ? 'scale(0.6)' : ''}` }}>
                    {`${index} * ${segmentAngle} = ${index * segmentAngle}`}
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
