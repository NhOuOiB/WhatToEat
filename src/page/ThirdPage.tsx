import { useState } from 'react';
import CalendarPanel from '../components/calendar/CalendarPanel.tsx';
import CaloriesPanel from '@/components/caloriesPanel/CaloriesPanel.tsx';

const ThirdPage = () => {
  const [event, setEvent] = useState<{ start: ''; end: ''; title: ''; calories: '' }[]>([]);

  return (
    <div className="sm:h-screen snap-start flex flex-col md:flex-row justify-center items-center sm:gap-6">
      <CalendarPanel event={event} />
      <CaloriesPanel setEvent={setEvent} />
    </div>
  );
};

export default ThirdPage;
