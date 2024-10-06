import React, { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Props {
  event: { start: ''; end: ''; title: ''; calories: '' }[];
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarPanel: FC<Props> = ({ event, setEdit }) => {
  return (
    <div className="w-5/6 sm:w-2/3 md:w-5/12 h-screen sm:h-2/3 border shadow rounded-xl p-4">
      <Calendar
        localizer={localizer}
        views={['month', 'week']}
        events={event}
        onSelectEvent={(e) => {
          console.log(e);
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
