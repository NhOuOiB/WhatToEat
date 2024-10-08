import React, { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CaloriesRecord } from '@/types/type';

const localizer = momentLocalizer(moment);

interface Props {
  event: { id: string; start: string; end: string; title: string; calories: string }[];
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<CaloriesRecord>>;
  setEditDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setRecordList: React.Dispatch<React.SetStateAction<CaloriesRecord[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarPanel: FC<Props> = ({ event, setEdit, setEditData, setEditDate, setRecordList, setSelectedDate }) => {
  const findEventsOnSameDay = (date: Date) => {
    return event.filter((e) => moment(e.start).isSame(date, 'day'));
  };
  return (
    <div className="w-5/6 sm:w-2/3 md:w-5/12 h-screen sm:h-2/3 border shadow rounded-xl p-4">
      <Calendar
        localizer={localizer}
        views={['month', 'week']}
        events={event}
        onSelectEvent={(e) => {
          setEditData(e);
          setEditDate(moment(e.start).toDate());
          const eventsOnSameDay = findEventsOnSameDay(moment(e.start).toDate());
          setSelectedDate(moment(e.start).toDate());
          setRecordList(eventsOnSameDay);
          setEdit(true);
        }}
        onSelectSlot={(slotInfo) => {
          const date = slotInfo.slots[0];
          const eventsOnSameDay = findEventsOnSameDay(date);
          setRecordList(eventsOnSameDay);
          setSelectedDate(date);
          setEdit(false);
        }}
        selectable
      />
    </div>
  );
};

export default CalendarPanel;
