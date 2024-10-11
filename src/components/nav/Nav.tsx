import React from 'react';

const Nav = () => {
  return (
    <div className="w-fit h-fit absolute left-2 top-2 flex items-center">
      <div className='w-10 h-10 border absolute rounded-full shadow -z-10 hidden'></div>
      <div className="w-8 hover:w-96 h-8 border shadow rounded-full transition-all duration-300"></div>
      <div className='w-10 h-10 border absolute right-0 rounded-full shadow -z-10 hidden'></div>
    </div>
  );
};

export default Nav;
