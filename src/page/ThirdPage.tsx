import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { nutritionix_id, nutritionix_key } from '../../utils/config.ts';
import axios from 'axios';
import { Input } from '@/components/ui/input';

const localizer = momentLocalizer(moment);

const ThirdPage = () => {
  const event = [
    {
      start: moment('2024-09-11T10:00:00').toDate(),
      end: moment('2024-09-11T10:00:00').toDate(),
      title: '午餐',
      food: '牛肉麵',
    },
    {
      start: moment('2024-09-11T10:00:00').toDate(),
      end: moment('2024-09-11T10:00:00').toDate(),
      title: '晚餐',
      food: '牛肉麵',
    },
  ];
  const [searchText, setSearchText] = React.useState('');

  const handleChange = (e) => {
    const timeout = setTimeout(() => {
      if (timeout) clearTimeout(timeout);
      console.log(e.target.value);
      setSearchText(e.target.value);
    }, 1500);
    timeout;
  };

  useEffect(() => {
    (async () => {
      // const result = await axios.get(
      //   `https://trackapi.nutritionix.com/v2/search/instant?query=apple`,
      //   {
      //     headers: {
      //       'x-app-id': nutritionix_id,
      //       'x-app-key': nutritionix_key,
      //     },
      //   }
      // );
      // console.log(result);
    })();
  }, []);

  return (
    <div className="h-screen snap-start flex flex-col md:flex-row justify-center items-center sm:gap-6">
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
      <div className="w-5/6 sm:w-2/3 md:w-1/2 h-screen sm:h-2/3 border shadow rounded-xl flex flex-col justify-center items-center gap-4 p-4">
        <div className="w-full h-1/4 border rounded-xl flex justify-center items-center">
          <Input className="w-80" onChangeCapture={handleChange} value={searchText} />
        </div>
        <div className="w-full h-2/3 border rounded-xl"></div>
      </div>
    </div>
  );
};

export default ThirdPage;
