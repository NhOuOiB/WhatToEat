import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import style from './CaloriesPanel.module.scss';
// shadcn
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { VscLoading } from 'react-icons/vsc';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
// 外加timepicker
import { TimePickerInput } from '@/components/ui/time-picker-input.tsx';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { IoMdAdd } from 'react-icons/io';
// calories search
import { nutritionix_id, nutritionix_key } from '../../../utils/config';
import axios from 'axios';
// firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../utils/config.ts';
import { getDatabase, ref, set, push, child, get } from 'firebase/database';

interface Props {
  setEvent: React.Dispatch<React.SetStateAction<{ start: ''; end: ''; title: ''; calories: '' }[]>>;
}

const CaloriesPanel: FC<Props> = ({ setEvent }) => {
  const [edit, setEdit] = useState<boolean>(false);
  // timepicker
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  // carlorie search
  const [searchResult, setSearchResult] = useState<{ food_name: ''; nf_calories: '' }[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  let timeout: ReturnType<typeof setTimeout> | null = null;

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
  const [date, setDate] = React.useState<Date | undefined>(moment().toDate());
  const [newData, setNewData] = useState<{ title: ''; calories: '' }>({
    title: '',
    calories: '',
  });

  const app = initializeApp(JSON.parse(firebaseConfig));
  const db = getDatabase(app);
  const dbRef = ref(db, 'records');

  useEffect(() => {
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setEvent(Object.values(data));
      } else {
        console.log('No data available');
      }
    });
  }),
    [];

  const addRecord = () => {
    if (!newData || newData.title === '' || newData.calories === '' || !date) {
      console.log('Please fill in the title, calories and date.');
      return;
    }

    const newKey = push(child(dbRef, '/records/')).key;
    console.log(newKey);
    if (!newKey) {
      console.error('Failed to generate a new key for the record.');
      return;
    }
    console.log(date);
    set(ref(db, `records/${newKey}`), {
      id: newKey,
      title: newData.title,
      calories: newData.calories,
      start: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(date).format('YYYY-MM-DD HH:mm:ss'),
    })
      .then(() => {
        setNewData({ title: '', calories: '' });
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

  return (
    <div className="w-5/6 sm:w-2/3 md:w-1/2 h-screen sm:h-2/3 border shadow rounded-xl flex flex-col justify-center items-center gap-4 p-4">
      <div className="w-full h-1/5 border rounded-xl flex justify-center items-center">
        <div className="w-full lg:w-1/2 relative p-2 sm:p-0">
          <Label htmlFor="search">搜詢食物熱量</Label>
          <Input
            id="search"
            className="w-full mb-1"
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
      <div className="w-full h-full border rounded-xl px-4 py-4 flex flex-wrap sm:grid grid-cols-2 gap-4">
        <div className="w-full h-1/2 sm:h-full bg-slate-300 flex flex-col justify-between items-center py-4">
          <div className="w-full flex flex-col items-center px-8">
            <div className="w-full">
              <Label htmlFor="title">標題</Label>
              <Input
                id="title"
                className="w-full mb-1"
                placeholder="輸入食物名稱或是早餐、午餐、晚餐"
                onChange={handleChange}
                value={newData.title}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="calories">卡路里</Label>
              <Input
                id="calories"
                className="w-full mb-1"
                placeholder="輸入食物熱量"
                onChange={handleChange}
                value={newData.calories}
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
                      'w-full justify-start text-left mb-1 font-bold',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? moment(date).format(`YYYY-MM-DD HH:mm`) : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker mode="single" selected={date} onSelect={setDate} />
                  <hr className="mx-4 my-0" />
                  <div className="px-4 my-4 flex justify-between">
                    <div className="flex gap-2 items-center">
                      <Clock className="h-5 w-5" />
                      <p className="text-sm font-medium">Time</p>
                    </div>
                    <div className="font-medium">
                      <div className="flex items-center gap-2">
                        <TimePickerInput
                          picker="hours"
                          date={date}
                          setDate={setDate}
                          ref={hourRef}
                          onRightFocus={() => minuteRef.current?.focus()}
                        />
                        <span>:</span>
                        <TimePickerInput
                          picker="minutes"
                          date={date}
                          setDate={setDate}
                          ref={minuteRef}
                          onLeftFocus={() => hourRef.current?.focus()}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button className="w-20" onClick={addRecord}>
            <IoMdAdd />
          </Button>
        </div>
        <div className={`${style.card_container}`}>
          <div className={`${style.card}`} onClick={() => setEdit(true)}>
            <div className="w-full h-full border"></div>
          </div>
          <div
            className={`${style.card} ${edit ? style.card_edit : style.card_reset}`}
            onClick={() => setEdit(false)}
          >
            <div className="w-full h-full border border-sky-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesPanel;
