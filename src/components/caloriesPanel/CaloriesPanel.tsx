import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import style from './CaloriesPanel.module.scss';
import { CaloriesRecord } from '@/types/type';
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
// calories search
import { nutritionix_id, nutritionix_key } from '../../../utils/config';
import axios from 'axios';
// firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../utils/config.ts';
import { getDatabase, ref, set, push, child, get, update, remove } from 'firebase/database';
// react-icons
import { IoMdAdd } from 'react-icons/io';
import { BiSolidSave } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

interface Props {
  event: { id: string; start: string; end: string; title: string; calories: string }[];
  setEvent: React.Dispatch<
    React.SetStateAction<
      { id: string; start: string; end: string; title: string; calories: string }[]
    >
  >;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editData: CaloriesRecord;
  setEditData: React.Dispatch<React.SetStateAction<CaloriesRecord>>;
  editDate: Date | undefined;
  setEditDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  recordList: CaloriesRecord[];
  setRecordList: React.Dispatch<React.SetStateAction<CaloriesRecord[]>>;
  selectedDate: Date;
}

const CaloriesPanel: FC<Props> = ({
  event,
  setEvent,
  edit,
  setEdit,
  editData,
  setEditData,
  editDate,
  setEditDate,
  recordList,
  setRecordList,
  selectedDate,
}) => {
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

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  };

  // firebase
  const [date, setDate] = React.useState<Date | undefined>(moment().toDate());
  const [newData, setNewData] = useState<CaloriesRecord>({
    id: '',
    title: '',
    calories: '',
    start: '',
  });

  const app = initializeApp(JSON.parse(firebaseConfig));
  const db = getDatabase(app);
  const dbRef = ref(db, 'records');

  const fetchData = async () => {
    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data: { id: string; start: string; end: string; title: string; calories: string }[] =
          Object.values(snapshot.val());
        setEvent(data);
        const selectedDateRecord = data.filter((record: CaloriesRecord) =>
          moment(record.start).isSame(selectedDate, 'day')
        );
        setRecordList(selectedDateRecord);
      } else {
        console.log('No data available');
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    set(ref(db, `records/${newKey}`), {
      id: newKey,
      title: newData.title,
      calories: newData.calories,
      start: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(date).format('YYYY-MM-DD HH:mm:ss'),
    })
      .then(() => {
        setNewData({ id: '', title: '', calories: '', start: '' });
        fetchData();
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

  const updateRecord = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (
      !editData ||
      editData.title === '' ||
      editData.calories === '' ||
      !editDate ||
      !editData.id
    ) {
      console.log('Please fill in the title, calories and date.');
      return;
    }

    update(ref(db, `records/${editData.id}`), {
      id: editData.id,
      title: editData.title,
      calories: editData.calories,
      start: moment(editDate).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(editDate).format('YYYY-MM-DD HH:mm:ss'),
    })
      .then(() => {
        console.log('更新成功');
        fetchData();
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

  const deleteRecord = (id: string) => {
    remove(ref(db, `records/${id}`))
      .then(() => {
        console.log('刪除成功');
        fetchData();
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  // console.log('recordList', recordList);
  return (
    <div className="w-5/6 sm:w-2/3 md:w-1/2 h-screen sm:h-2/3 border shadow rounded-xl flex flex-col justify-center items-center gap-4 p-4">
      <div className="w-full min-h-1/5 h-1/5 border rounded-xl flex justify-center items-center">
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
      <div className="w-full h-4/5 max-h-4/5 border rounded-xl px-4 py-4 flex flex-wrap sm:grid grid-cols-2 gap-4">
        <div className="w-full h-1/2 sm:h-full flex flex-col justify-between items-center py-4 shadow">
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addRecord();
                  }
                }}
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
                    <CalendarIcon className="mr-2 min-w-4 w-4" />
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
          <div className={`${style.card}`}>
            <div className="w-full h-full border-2 border-slate-900 py-6 flex flex-col justify-evenly items-center gap-4 2xl:gap-8">
              <div className="w-4/5 h-full max-h-[24rem] overflow-scroll flex flex-col gap-4">
                {recordList.length > 0 ? (
                  recordList.map((record, i) => (
                    <div
                      className="w-full min-h-8 h-8 flex justify-center items-center gap-2"
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="w-8 h-full bg-white hover:bg-gray-100 rounded-full shadow flex justify-center items-center cursor-pointer"
                        onClick={() => deleteRecord(record.id)}
                      >
                        <CgClose />
                      </div>
                      <div
                        className="w-4/5 h-full bg-white hover:bg-gray-100 rounded-full shadow flex justify-between items-center px-4 cursor-pointer"
                        onClick={() => {
                          setEdit(true);
                          setEditData(record);
                          setEditDate(moment(record.start).toDate());
                        }}
                      >
                        <div className="w-1/2 truncate">{record.title}</div>
                        <div className="w-1/2 flex justify-end">
                          <div className="text-ellipsis overflow-hidden">{record.calories}</div>
                          kcal
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=""></div>
                )}
              </div>
              <div className="h-fit text-xl">{moment(selectedDate).format('MMM D')}</div>
            </div>
          </div>
          <div
            className={`${style.card} ${edit ? style.card_edit : style.card_reset}`}
            onClick={() => setEdit(false)}
          >
            <div className="w-full h-full border-2 border-gray-200 flex flex-col justify-between items-center">
              <div
                className="w-4/5 2xl:w-3/5 h-fit flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full">
                  <Label htmlFor="edit_title" className="text-white">
                    標題
                  </Label>
                  <Input
                    id="edit_title"
                    name="title"
                    className="w-full mb-1"
                    placeholder="輸入食物名稱或是早餐、午餐、晚餐"
                    onChange={handleEditChange}
                    value={editData?.title}
                    disabled={editData.id ? false : true}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="edit_calories" className="text-white">
                    卡路里
                  </Label>
                  <Input
                    id="edit_calories"
                    name="calories"
                    className="w-full mb-1"
                    placeholder="輸入食物熱量"
                    onChange={handleEditChange}
                    value={editData?.calories}
                    disabled={editData.id ? false : true}
                  />
                </div>
                <div className="w-full flex flex-col justify-center gap-1">
                  <Label htmlFor="edit_time" className="text-sm text-white">
                    時間
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild id="edit_time" disabled={editData.id ? false : true}>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left mb-1 font-bold',
                          !editDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 min-w-4 w-4" />
                        {editDate ? (
                          moment(editDate).format(`YYYY-MM-DD HH:mm`)
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <DatePicker mode="single" selected={editDate} onSelect={setEditDate} />
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
                              date={editDate}
                              setDate={setEditDate}
                              ref={hourRef}
                              onRightFocus={() => minuteRef.current?.focus()}
                            />
                            <span>:</span>
                            <TimePickerInput
                              picker="minutes"
                              date={editDate}
                              setDate={setEditDate}
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
              <Button
                className={`w-20 bg-gray-200 hover:bg-gray-100 text-slate-900 mb-4 text-xl ${
                  !editData.id && 'bg-opacity-50'
                }`}
                onClick={updateRecord}
              >
                <BiSolidSave />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesPanel;
