import React from 'react';

const Nav = () => {
  return (
    <div className="w-fit h-fit absolute left-4 top-4 flex items-center">
      <div className="w-12 hover:w-[17.4rem] h-12 border shadow rounded-full transition-all duration-300 bg-white flex items-center gap-2 overflow-hidden">
        <div className="min-w-12 h-full rounded-full"></div>
        <div className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner">
          轉盤
        </div>
        <div className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner">
          地圖
        </div>
        <div className="border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner">
          記錄
        </div>
      </div>
    </div>
  );
};

export default Nav;
