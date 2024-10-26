import React, { FC, useState } from 'react';
import CalendarPanel from '../components/calendar/CalendarPanel.tsx';
import CaloriesPanel from '@/components/caloriesPanel/CaloriesPanel.tsx';
import { CaloriesRecord } from '@/types/type';

interface Props {
  thirdPageRef: React.RefObject<HTMLDivElement>;
}

const ThirdPage: FC<Props> = ({ thirdPageRef }) => {
  const [event, setEvent] = useState<
    { id: string; start: string; end: string; title: string; calories: string }[]
  >([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<CaloriesRecord>({
    id: '',
    title: '',
    calories: '',
    start: '',
  });
  const [editDate, setEditDate] = React.useState<Date | undefined>(undefined);
  const [recordList, setRecordList] = useState<CaloriesRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div
      className="h-fit sm:h-screen snap-start flex flex-col xl:flex-row justify-center items-center sm:gap-6"
      ref={thirdPageRef}
      id='thirdPage'
    >
      <CalendarPanel
        event={event}
        setEdit={setEdit}
        setEditData={setEditData}
        setEditDate={setEditDate}
        setRecordList={setRecordList}
        setSelectedDate={setSelectedDate}
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
        recordList={recordList}
        setRecordList={setRecordList}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ThirdPage;
