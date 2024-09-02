import React from 'react';
import { PiSpinnerBallDuotone } from 'react-icons/pi';

interface Props {
  className?: string;
  specialMode: boolean;
}

export const SpinnerIconGradient: React.FC<Props> = ({ className, specialMode }) => {
  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#ff6b6b" offset="0%" />
          <stop stopColor="#f06595" offset="20%" />
          <stop stopColor="#cc5de8" offset="40%" />
          <stop stopColor="#845ef7" offset="60%" />
          <stop stopColor="#5c7cfa" offset="80%" />
          <stop stopColor="#339af0" offset="100%" />
        </linearGradient>
      </svg>

      <PiSpinnerBallDuotone
        className={`absolute transition ${specialMode ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{
          fill: 'url(#icon-gradient)',
        }}
      />
    </>
  );
};
