import { FC, useState, useEffect } from 'react';
import style from './Nav.module.scss'

interface Props {
  firstPageRef: React.RefObject<HTMLDivElement>;
  secondPageRef: React.RefObject<HTMLDivElement>;
  thirdPageRef: React.RefObject<HTMLDivElement>;
}

const Nav: FC<Props> = ({ firstPageRef, secondPageRef, thirdPageRef }) => {
  const [pageNow, setPageNow] = useState('firstPage');
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPageNow(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // 當元素 50% 可見時觸發
      }
    );

    if (firstPageRef.current) observer.observe(firstPageRef.current);
    if (secondPageRef.current) observer.observe(secondPageRef.current);
    if (thirdPageRef.current) observer.observe(thirdPageRef.current);
    
    return () => {
      observer.disconnect();
    };
  }
    , [firstPageRef, secondPageRef, thirdPageRef]);
  return (
    <div className="w-fit h-fit absolute left-4 top-4 flex items-center">
      <div className={`${style.nav}`}>
        <div className={`${style.hamburger_menu}`}>
          <div className={`${style.line}`}></div>
          <div className={`${style.line}`}></div>
          <div className={`${style.line}`}></div>
        </div>
        <div
          className={`border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner ${
            pageNow === 'firstPage' ? 'shadow-inner bg-slate-50' : ''
          }`}
          onClick={() => scrollToRef(firstPageRef)}
        >
          轉盤
        </div>
        <div
          className={`border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner ${
            pageNow === 'secondPage' ? 'shadow-inner bg-slate-50' : ''
          }`}
          onClick={() => scrollToRef(secondPageRef)}
        >
          地圖
        </div>
        <div
          className={`border py-1 px-4 rounded-full text-nowrap cursor-pointer hover:shadow-inner ${
            pageNow === 'thirdPage' ? 'shadow-inner bg-slate-50' : ''
          }`}
          onClick={() => scrollToRef(thirdPageRef)}
        >
          記錄
        </div>
      </div>
    </div>
  );
};

export default Nav;
