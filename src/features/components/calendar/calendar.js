import React, {useState, useRef } from "react";
import styles from './calendar.module.scss';

export const Calendar = props => {
  const ref = useRef(null)
  const {dateHandler, placeholder, val} = props
  const [value, setValue] = useState(val ? val : "")
  const [timerId, setTimerId] = useState(null)
  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => dateHandler(val), 500);
    setTimerId(timer);
  }
  const clearInput = () => {
    clearTimeout(timerId);
    setValue('');
    ref.current.focus();
  }
  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  const [monthDay, setmonthDay] = useState(new Date(Date.now()))
  
  const year = monthDay.getFullYear(),
        month = monthDay.getMonth(),
        date = new Date(year, month, 1),
        from = date.getTime(),
        to = new Date(year, month + 1, 0, 23, 59, 59, 999 ).getTime(); 
  const monthDays = [];
  const gapDays = [];
  const gapTo = date.getDay() === 0 ? 7 : date.getDay();
  for ( let gapDay = 1; gapDay < gapTo; gapDay++ ) gapDays.push({'key': `gap${gapDay}`})
  for ( let day = from; day < to; day += 24*60*60*1000 ) monthDays.push(new Date(day))

  const setPickerMonth = (direct) => {
    let setMonth;
    switch ( direct ) {
     case 'next': setMonth = month + 1; break;
     case 'prev': setMonth = month - 1; break;
     default: setMonth = new Date(Date.now()).getMonth();
    }
    setmonthDay(new Date(year, setMonth , 1))
  }

  const setPickerYear = (direct) => {
    let setYear;
    switch ( direct ) {
     case 'next': setYear = year + 1; break;
     case 'prev': setYear = year - 1; break;
     default: setYear = new Date(Date.now()).getFullYear();
    }
    setmonthDay(new Date(setYear, month , 1))
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {placeholder}
          ref={ref}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <div className={styles.picker}>
        <nav className={styles.navigation}>
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerMonth('prev')}>prev</button>
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerMonth('curr')}>{monthDay.getMonth() + 1}</button>         
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerMonth('next')}>next</button>
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerYear('prev')}>prev</button>
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerYear('curr')}>{monthDay.getFullYear()}</button>
          <button type="button" className={styles.pickerNavBtn} onClick={() => setPickerYear('next')}>next</button>
        </nav>

        <div className={styles.dayNames}>
          <div>Mn</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>St</div><div>Su</div>
        </div>        
        
        <main className={styles.dates}>
          {gapDays.map(gapDay => <div key={gapDay.key}></div>)}
          {monthDays.map(day => {
            const d = day.getDate()
            let today = '';
            if ( day.getTime() === new Date(Date.now()).setHours(0, 0, 0, 0) ) today = '*';
            return <div key={d}>{`${d} ${today}`}</div>
          })}
        </main>
      </div>
    </div>
  )
}
