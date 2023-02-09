/* eslint-disable no-useless-escape */
import React, {useState, useRef } from "react";
import styles from './calendar.module.scss';
import DatePicker from "./datePicker";

export const Calendar = props => {
  const ref = useRef(null)
  const {dateHandler, lang} = props
  
  const [value, setValue] = useState("")
  const [jsDate, setJsDate] = useState(null)

  const onSetDate = date => {
    if ( !date ) { setValue(''); setJsDate(null); return }
    setJsDate(date)
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    setValue(lang === 'ru' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`)
    dateHandler(date) 
  }

  const onInput = val => {
    let dateVal = val.replace(/[^0-9\.\/-]/ig, "")
    dateVal = dateVal.replace(/\.{2,}/ig, ".")
    dateVal = dateVal.replace(/\/{2,}/ig, "/")
    dateVal = dateVal.replace(/-{2,}/ig, "-")
    setValue(dateVal);
  }

  const onBlur = () => {
    let val;
    if ( /\./.test(value) ) val = value.split('.');
    if ( /-/.test(value) ) val = value.split('-');
    if ( /\//.test(value) ) val = value.split('/');
    if ( !val || val.length !== 3) { onSetDate(null); return }
    const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    if ( !inputDate.getTime() ) { onSetDate(null); return }
    onSetDate(inputDate)
  }

  const clearInput = () => {
    onSetDate(null)
    ref.current.focus();
  }

  const localMask = lang === 'ru' ? 'дд.мм.гггг' : 'dd-mm-yyyy'
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
        setValue={onSetDate}
      />

    </div>
  )
}
