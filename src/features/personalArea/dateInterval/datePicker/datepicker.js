import React, { useEffect, useState } from "react";
import styles from './datepicker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export const DatePicker = props => {
  const { lang, valueFrom, valueTill, setValue, closePicker } = props

  const [monthDay, setmonthDay] = useState(new Date(Date.now()))
  const [monthNav, setmmonthNav] = useState(false)
  const [yearNav, setyearNav] = useState(false)

  useEffect(()=> setmonthDay(valueFrom ? valueFrom : new Date(Date.now())), [valueFrom])

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

  const toggleMnNav = () => setmmonthNav(!monthNav)
  const toggleYrNav = () => setyearNav(!yearNav)
  const setNavMonth = ( monthNum ) => {
    setmonthDay(new Date(year, monthNum , 1))
    setmmonthNav(false)
  }
  const setNavYear = ( year ) => {
    setmonthDay(new Date(year, month , 1))
    setyearNav(false)
  }

  return (
    <div className={styles.picker}>
      <nav className={styles.navigation}>
      <div className={styles.yearhNav}>
          <button type="button" onClick={() => setPickerYear('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" className={styles.navNav} onClick={() => toggleYrNav()}>{monthDay.getFullYear()}</button>
          <button type="button" onClick={() => setPickerYear('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button> 
          { yearNav 
            ? <div className={styles.yearLs}>
                { [ ...Array(new Date(Date.now()).getFullYear() - 2014).keys() ].map(i=>
                    <button key={2015+i} type="button" 
                      onClick={() => setNavYear(2015+i)}
                      className={2015+i === new Date(Date.now()).getFullYear() ? `${styles.curYear}` : "" }
                    >{2015+i}</button>
                ) }
              </div>
            : null
          }                  
        </div>

        <div className={styles.monthNav}>
          <button type="button" onClick={() => setPickerMonth('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" className={`${styles.rest} ${styles.navNav}`} onClick={() => toggleMnNav()}>{monthDay.toLocaleString(lang, { month: 'long' })}</button>         
          <button type="button" onClick={() => setPickerMonth('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button>          
          { monthNav 
            ? <div className={styles.monthLs}>
                { [0,1,2,3,4,5,6,7,8,9,10,11].map(mnNum => 
                  <button key={mnNum} type="button" 
                    onClick={() => setNavMonth(mnNum)}
                    className={mnNum === new Date(Date.now()).getMonth() ? `${styles.curMonth}` : "" }
                  >{new Date(year, mnNum + 1,0,23,59,59,999).toLocaleString(lang, { month: 'long' })}</button>
                ) }
              </div>
            : null
          }
        </div>

      </nav>

      <div className={styles.dayNames}>
        {[{'EN': 'Mon', 'RU': 'пн'},
          {'EN': 'Tue', 'RU': 'вт'},
          {'EN': 'Wed', 'RU': 'ср'},
          {'EN': 'Thu', 'RU': 'чт'},
          {'EN': 'Fri', 'RU': 'пт'},
          {'EN': 'Sat', 'RU': 'сб'},
          {'EN': 'Sun', 'RU': 'вс'}].map((item, index) => {
            const styleNameDay = index === 5 || index === 6 ? `${styles.weekDayName} ${styles.weekend}` : `${styles.weekDayName}`  
            return <div key={index} className={styleNameDay}>{item[lang]}</div>
        })}
      </div>
      
      <main className={styles.dates}>
        {gapDays.map(gapDay => <div key={gapDay.key}></div>)}
        {monthDays.map(day => {
          const d = day.getDate()
          let styleDateCell = day.getTime() === new Date(Date.now()).setHours(0, 0, 0, 0)
            ? `${styles.dateCell} ${styles.today}`
            : `${styles.dateCell}`
          
            styleDateCell = day.getDay() === 0 || day.getDay() === 6
            ? `${styleDateCell} ${styles.weekend}`
            : `${styleDateCell}`
          
            styleDateCell = (valueFrom && day.getTime() === valueFrom.setHours(0, 0, 0, 0)) || (valueFrom && day.getTime() >= valueFrom.setHours(0, 0, 0, 0) && valueTill &&  day.getTime() <= valueTill.setHours(0, 0, 0, 0))
            ? `${styleDateCell} ${styles.selected}`
            : `${styleDateCell}`

          return <div key={d} 
                    className={styleDateCell}
                    onClick={()=>{
                      setValue(day)
                    }}
                  >{`${d}`}</div>
        })}
      </main>
    </div>
  )
}
