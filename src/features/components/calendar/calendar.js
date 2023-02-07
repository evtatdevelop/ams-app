/* eslint-disable no-useless-escape */
import React, {useState, useRef } from "react";
import styles from './calendar.module.scss';
import DatePicker from "./datePicker";

export const Calendar = props => {
  const ref = useRef(null)
  const {dateHandler, val, lang} = props
  
  const [value, setValue] = useState(val ? val : "")
  const [jsDate, setJsDate] = useState(null)
  const localMask = lang === 'ru' ? 'дд.мм.гггг' : 'dd-mm-yyyy'
  const [timerId, setTimerId] = useState(null)

  const onInput = val => {
    let dateVal = val.replace(/[^0-9\.\/-]/ig, "")
    dateVal = dateVal.replace(/\.{2,}/ig, ".")
    dateVal = dateVal.replace(/\/{2,}/ig, "/")
    dateVal = dateVal.replace(/-{2,}/ig, "-")
    setValue(dateVal);
    clearTimeout(timerId);
    setTimerId(setTimeout(() => dateHandler(val), 500));
  }

  const onBlur = () => {
    let val;
    if ( /\./.test(value) ) val = value.split('.');
    if ( /-/.test(value) ) val = value.split('-');
    if ( /\//.test(value) ) val = value.split('/');
    if ( !val || val.length !== 3) {
      setValue('')
      setJsDate(null)
      return
    }
    const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    console.log(inputDate);
    if ( !inputDate.getTime() ) {
      setValue('')
      return
    }
    setJsDate(inputDate);
    const dd = inputDate.getDate() > 9 ? inputDate.getDate() : `0${inputDate.getDate()}`
    const mm = inputDate.getMonth()+1 > 9 ? inputDate.getMonth()+1 : `0${inputDate.getMonth()+1}`
    setValue(lang === 'ru' ? `${dd}.${mm}.${inputDate.getFullYear()}` : `${dd}-${mm}-${inputDate.getFullYear()}`)
  }

  const clearInput = () => {
    clearTimeout(timerId);
    setValue('');
    setJsDate(null)
    ref.current.focus();
  }
  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  return (
    <div className={styles.calendar}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {localMask}
          ref={ref}
          onBlur={() => onBlur()}
          // readOnly={true}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>

      <DatePicker
        lang={lang}
        value={jsDate}
      />

    </div>
  )
}
