import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { nutritionix_id, nutritionix_key } from '../../utils/config.ts';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { VscLoading } from 'react-icons/vsc';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IoMdAdd } from 'react-icons/io';

// firebase
import { getDatabase, ref, onValue, set, push, child } from 'firebase/database';

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
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const [searchResult, setSearchResult] = useState<{ food_name: ''; nf_calories: '' }[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(moment().toDate());
  const [newData, setNewData] = useState<{ title: ''; calories: '' }>({ title: '', calories: '' });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    setSearchValue(e.target.value);
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fetchCaloriesData(e.target.value);
    }, 2000);
  };

  const fetchCaloriesData = async (query: string) => {
    try {
      const result = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
        {
          headers: {
            'x-app-id': nutritionix_id,
            'x-app-key': nutritionix_key,
          },
        }
      );
      setSearchResult(result.data.branded);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setSearching(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({
      ...newData,
      [event.target.id]: event.target.value,
    });
  };

  // firebase
  const db = getDatabase();
  const dbRef = ref(db, '/records/');

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // setNewData(data);
  });

  const addRecord = () => {
    if (!newData || newData.title === '' || newData.calories === '' || !date) {
      console.log('Please fill in the title, calories and date.');
      return;
    }

    const newKey = push(child(dbRef, '/records/')).key;
    if (!newKey) {
      console.error('Failed to generate a new key for the record.');
      return;
    }

    set(ref(db, `/records/${newKey}`), {
      title: newData.title,
      calories: newData.calories,
      date: date,
    })
      .then(() => {
        setNewData({ title: '', calories: '' });
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

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
        <div className="w-full h-1/5 border rounded-xl flex justify-center items-center">
          <div className="relative">
            <Label htmlFor="search">搜詢食物熱量</Label>
            <Input
              id="search"
              className="w-96 mb-1"
              onChange={handleSearchChange}
              onFocus={() => setShow(true)}
              onBlur={() => setShow(false)}
              placeholder="輸入食物名稱 ( 英文 )"
              value={searchValue}
            />
            {searchValue?.length > 0 && show && (
              <div
                className={`w-full ${
                  searchResult.length > 5 && 'max-h-[calc(14rem+2px)] overflow-auto'
                } bg-white border rounded-md p-1 pb-0 absolute flex flex-col`}
              >
                {searchResult?.length > 0 && !searching ? (
                  searchResult.map((item, i) => (
                    <div
                      className="w-full min-h-10 border rounded-md flex justify-between items-center px-3 text-sm transition hover:bg-[#e6e6e6] hover:shadow-inner cursor-pointer mb-1"
                      key={i}
                    >
                      <p className="w-48 truncate">{item.food_name}</p>
                      <p>{item.nf_calories} kcal</p>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-10 border rounded-md flex justify-center items-center px-3 text-sm transition mb-1">
                    <div className="animate-spin">
                      <VscLoading />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full border rounded-xl p-2 grid grid-cols-2 gap-2">
          <div className="w-full h-full bg-slate-300 flex flex-col justify-between items-center py-4">
            <div className="w-full flex flex-col items-center px-8">
              <div className="w-full">
                <Label htmlFor="title">標題</Label>
                <Input
                  id="title"
                  className="w-full mb-1"
                  placeholder="輸入食物名稱或是早餐、午餐、晚餐"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="calories">卡路里</Label>
                <Input
                  id="calories"
                  className="w-full mb-1"
                  placeholder="輸入食物熱量"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col justify-center gap-1">
                <Label htmlFor="time" className="text-sm">
                  時間
                </Label>
                <Popover>
                  <PopoverTrigger asChild id="time">
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left mb-1',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                      {date ? moment(date).format(`YYYY-MM-DD`) : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePicker mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button className="w-20" onClick={addRecord}>
              <IoMdAdd />
            </Button>
          </div>
          <div className="w-full h-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
