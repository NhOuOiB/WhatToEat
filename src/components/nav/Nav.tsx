import { FC, useEffect } from 'react';

interface Props {
  firstPageRef: React.RefObject<HTMLDivElement>;
  secondPageRef: React.RefObject<HTMLDivElement>;
  thirdPageRef: React.RefObject<HTMLDivElement>;
}

const Nav: FC<Props> = ({ firstPageRef, secondPageRef, thirdPageRef }) => {
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="w-fit h-fit absolute left-4 top-4 flex items-center">
      <div className="w-12 hover:w-[17.4rem] h-12 border shadow rounded-full transition-all duration-300 bg-white flex items-center gap-2 overflow-hidden">
        <div className="min-w-12 h-full rounded-full flex flex-col justify-center items-center gap-1 overflow-hidden">
          <div className='w-1/2 h-0.5 bg-slate-900'></div>
          <div className='w-1/2 h-0.5 bg-slate-900'></div>
          <div className='w-1/2 h-0.5 bg-slate-900'></div>
        </div>
        <div
          className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner"
          onClick={() => scrollToRef(firstPageRef)}
        >
          轉盤
        </div>
        <div
          className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner"
          onClick={() => scrollToRef(secondPageRef)}
        >
          地圖
        </div>
        <div
          className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner"
          onClick={() => scrollToRef(thirdPageRef)}
        >
          記錄
        </div>
      </div>
    </div>
  );
};

export default Nav;
