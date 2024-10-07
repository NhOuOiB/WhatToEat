import React, { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CaloriesRecord } from '@/types/type';

const localizer = momentLocalizer(moment);

interface Props {
  event: { start: ''; end: ''; title: ''; calories: '' }[];
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<CaloriesRecord>>;
  setEditDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setRecordList?: React.Dispatch<React.SetStateAction<CaloriesRecord[]>>;
}

const CalendarPanel: FC<Props> = ({ event, setEdit, setEditData, setEditDate, setRecordList }) => {
  return (
    <div className="w-5/6 sm:w-2/3 md:w-5/12 h-screen sm:h-2/3 border shadow rounded-xl p-4">
      <Calendar
        localizer={localizer}
        views={['month', 'week']}
        events={event}
        onSelectEvent={(e) => {
          console.log(e);
          setEditData(e);
          setEditDate(moment(e.start).toDate());
          setEdit(true);
        }}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo.slots);
        }}
        selectable
      />
    </div>
  );
};

export default CalendarPanel;
