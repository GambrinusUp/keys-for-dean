import styles from './components.module.css'
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {findRange, testDays, times} from "../constants/constants";
import DayItem from "./DayItem";
import TimeItem from "./TimeItem";
import {useEffect, useState} from "react";
import {Checkbox} from "antd";
import moment from "moment/moment";

function CalendarItem({ onCheckboxChange }) {
    const [isChecked, setIsChecked] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedTime, setSelectedTime] = useState(1);

    function findCurrentRangeIndex(currentTime) {
        const currentMoment = moment(currentTime, 'HH:mm');
        for (let i = 0; i < findRange.length; i++) {
            const [start, end] = findRange[i].split('-').map(range => moment(range, 'HH:mm'));
            if (
                (currentMoment.isSameOrAfter(start) && currentMoment.isSameOrBefore(end))
            ) {
                return i === 0 ? i + 1 : i;
            }
        }
        return 1;
    }

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
            //dispatch(getScheduleThunkCreator(id, newWeekDates[0]));
            return newWeekDates;
        });
        console.log(moment(currentWeekDates[0]).format('DD.MM'));
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

        console.log(weekDates);

        let sDay = weekDates.findIndex(date => date === moment().format('YYYY-MM-DD')) + 1;
        if (sDay === 7)
            sDay = 1;
        setSelectedDay(sDay);
        setCurrentTime(moment());
        console.log(moment().format('HH:mm'));
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.calendarWrapper}>
            <span>
                Календарь
            </span>
            <div className={styles.daySelect}>
                <LeftOutlined onClick={() => updateWeekDates(-1)}/>
                {testDays.map(item =>
                    <DayItem key={item.id} id={item.id}
                             date={moment(currentWeekDates[item.id - 1]).format('DD.MM')} day={item.day}
                             background={selectedDay === item.id ?
                                 'linear-gradient(90deg, #72C6EF 0%, #004E8F 100%)'
                             : '#D9D9D9'}
                             onClick={() => {setSelectedDay(item.id); console.log('Click1')}}
                    />)}
                <RightOutlined onClick={() => updateWeekDates(1)}/>
            </div>
            <div className={styles.timeSelect}>
                {times.map(timeItem =>
                    <TimeItem key={timeItem.id} id={timeItem.id}
                              range={timeItem.range} time={currentTime}
                              background={selectedTime === timeItem.id ?
                                  'linear-gradient(90deg, #72C6EF 0%, #004E8F 100%)'
                                  : '#D9D9D9'}
                              onClick={() => {setSelectedTime(timeItem.id); console.log('Click2')}}/>)}
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