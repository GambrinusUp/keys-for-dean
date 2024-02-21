import styles from './components.module.css'
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {testDays, times} from "../constants/constants";
import DayItem from "./DayItem";
import TimeItem from "./TimeItem";
import {useEffect, useState} from "react";
import {Checkbox} from "antd";
import moment from "moment/moment";
import {findCurrentRangeIndex} from "../helpers/helper";
import {useDispatch} from "react-redux";
import {getKeysThunkCreator} from "../store/keysReducer";

function CalendarItem({ onCheckboxChange }) {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment(currentTime).format('YYYY-MM-DD'));
    const [selectedTime, setSelectedTime] = useState(findCurrentRangeIndex(currentTime));

    function updateWeekDates(weeksToAdd) {
        setCurrentWeekDates((prevWeekDates) => {
            const newStartOfWeek = moment(prevWeekDates[0]).add(weeksToAdd, 'weeks');
            const newEndOfWeek = moment(prevWeekDates[6]).add(weeksToAdd, 'weeks');
            const newWeekDates = [];

            let currentDay = moment(newStartOfWeek);
            while (currentDay.isSameOrBefore(newEndOfWeek)) {
                newWeekDates.push(currentDay.format('YYYY-MM-DD'));
                currentDay.add(1, 'day');
            }
            return newWeekDates;
        });
    }

    const handleCheckboxChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onCheckboxChange(newState);
    };

    useEffect(() => {
        // eslint-disable-next-line
        const currentDate = moment();
        const startOfWeek = currentDate.startOf('isoWeek').format('YYYY-MM-DD');
        const endOfWeek = currentDate.endOf('isoWeek').format('YYYY-MM-DD');
        const weekDates = [];
        let currentDay = moment(startOfWeek);
        while (currentDay.isSameOrBefore(endOfWeek)) {
            weekDates.push(currentDay.format('YYYY-MM-DD'));
            currentDay.add(1, 'day');
        }
        setCurrentWeekDates(weekDates);
        setSelectedTime(findCurrentRangeIndex(currentTime));
        setCurrentTime(moment());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getKeysThunkCreator(selectedDay, selectedTime)).catch(() => console.log('error'));
    }, [dispatch, currentTime, selectedTime, selectedDay]); //+selectedDay

    return (
        <div className={styles.calendarWrapper}>
            <span>
                Календарь
            </span>
            <div className={styles.daySelect}>
                <LeftOutlined onClick={() => updateWeekDates(-1)}/>
                {testDays.map(item =>
                    <DayItem key={item.id}
                             id={item.id}
                             date={moment(currentWeekDates[item.id - 1]).format('DD.MM')}
                             day={item.day}
                             background={selectedDay === moment(currentWeekDates[item.id - 1]).format('YYYY-MM-DD') ?
                                 'linear-gradient(90deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)'
                             : '#D9D9D9'}
                             onClick={() => {
                                 setSelectedDay(moment(currentWeekDates[item.id - 1]).format('YYYY-MM-DD'));
                             }}
                    />)}
                <RightOutlined onClick={() => updateWeekDates(1)}/>
            </div>
            <div className={styles.timeSelect}>
                {times.map(timeItem =>
                    <TimeItem key={timeItem.id}
                              id={timeItem.id}
                              range={timeItem.range}
                              time={currentTime}
                              background={selectedTime === timeItem.id ?
                                  'linear-gradient(90deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)'
                                  : '#D9D9D9'}
                              onClick={() => {
                                  setSelectedTime(timeItem.id); console.log('Click2')
                              }}
                    />)}
            </div>
            <Checkbox
                checked={isChecked}
                //onChange={(e) => setIsChecked(e.target.checked)}
                onChange={handleCheckboxChange}
                style={{paddingTop: 10, fontSize: 17}}>
                Показывать только свободные аудитории
            </Checkbox>
        </div>
    )
}

export default CalendarItem;