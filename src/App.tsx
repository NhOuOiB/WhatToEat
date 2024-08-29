import { FC, useEffect, useRef } from 'react';
import FirstPage from './page/FirstPage';
import SecondPage from './page/SecondPage';
import './App.css';

const App: FC = () => {
  // 讓滾輪更平順
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      containerRef.current?.scrollBy({
        top: event.deltaY,
        behavior: 'smooth'
      });
    };

    const container = containerRef.current;
    container?.addEventListener('wheel', handleWheel);

    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="snap-y-mandatory" ref={containerRef}>
      <div className="snap-start">
        <FirstPage />
      </div>
      <div className="snap-start">
        <SecondPage />
      </div>
    </div>
  );
};

export default App;