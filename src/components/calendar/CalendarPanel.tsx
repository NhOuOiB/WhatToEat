import { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Props {
  event: { start: ''; end: ''; title: ''; calories: '' }[];
}

const CalendarPanel: FC<Props> = ({ event }) => {
  return (
    <div className="w-5/6 sm:w-2/3 md:w-5/12 h-screen sm:h-2/3 border shadow rounded-xl p-4">
      <Calendar
        localizer={localizer}
        views={['month', 'week']}
        events={event}
        onSelectEvent={(e) => {
          console.log(e);
        }}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo);
        }}
        selectable
      />
    </div>
  );
};

export default CalendarPanel;
