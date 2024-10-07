import React, { useState } from 'react';
import CalendarPanel from '../components/calendar/CalendarPanel.tsx';
import CaloriesPanel from '@/components/caloriesPanel/CaloriesPanel.tsx';
import { CaloriesRecord } from '@/types/type';

const ThirdPage = () => {
  const [event, setEvent] = useState<{ start: ''; end: ''; title: ''; calories: '' }[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<CaloriesRecord>({
    id: '',
    title: '',
    calories: '',
  });
  const [editDate, setEditDate] = React.useState<Date | undefined>(undefined);
  const [recordList, setRecordList] = useState<CaloriesRecord[]>([]);

  return (
    <div className="sm:h-screen snap-start flex flex-col md:flex-row justify-center items-center sm:gap-6">
      <CalendarPanel
        event={event}
        setEdit={setEdit}
        setEditData={setEditData}
        setEditDate={setEditDate}
        setRecordList={setRecordList}
      />
      <CaloriesPanel
        event={event}
        setEvent={setEvent}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        editDate={editDate}
        setEditDate={setEditDate}
      />
    </div>
  );
};

export default ThirdPage;
