import { useState } from 'react';
import CalendarPanel from '../components/calendar/CalendarPanel.tsx';
import CaloriesPanel from '@/components/caloriesPanel/CaloriesPanel.tsx';
import { CaloriesRecord } from '@/types/type';

const ThirdPage = () => {
  const [event, setEvent] = useState<{ start: ''; end: ''; title: ''; calories: '' }[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<CaloriesRecord>({
    title: '',
    calories: '',
  });

  return (
    <div className="sm:h-screen snap-start flex flex-col md:flex-row justify-center items-center sm:gap-6">
      <CalendarPanel event={event} setEdit={setEdit} />
      <CaloriesPanel setEvent={setEvent} edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default ThirdPage;
