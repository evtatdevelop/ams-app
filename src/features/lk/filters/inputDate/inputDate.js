/* eslint-disable no-useless-escape */
import React, {useState, useRef, useEffect } from "react";
import styles from './inputDate.module.scss';
import DatePicker from "./datePicker";
import { filters } from "../../lkSlice";
import { useSelector,  } from "react-redux";

export const InputDate = props => {
  const ref = useRef(null)
  const {dateHandler, lang, placeholder, dateClear, mode, width} = props
  
  const [value, setValue] = useState("")
  const [jsDate, setJsDate] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  const {searchDateTo, searchDateFrom, searchOrderFrom, searchOrderTo, } = useSelector(filters);

  // const searchDate = mode === 'from' ? searchDateFrom : searchDateTo;

  const modeSet = mode => {
    switch ( mode ) {
      case 'from': return searchDateFrom;
      case 'to': return searchDateTo;
      case 'orderFrom': return searchOrderFrom;
      case 'orderTo': return searchOrderTo;
      default: return;
    }
  }
  const searchDate = modeSet(mode);

  const onShowPicker = () => {
    setShowPicker(true)
  }

  useEffect(() => {
    if ( !searchDate ) {
      // console.log('!!!');
      
      setValue('');
      setShowPicker(false)
      setJsDate(null)
    }
  }, [searchDate]);

  const onSetDate = date => {
    if ( !date ) { setValue(''); setJsDate(null); return }
    setJsDate(date)
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    setValue(lang === 'RU' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`)
    dateHandler(`${date.getFullYear()}-${mm}-${dd}`)
  }

  const onInput = e => {
    let dateVal = e.target.value.replace(/[^0-9\.\/-]/ig, "")
    dateVal = dateVal.replace(/\.{2,}/ig, ".")
    dateVal = dateVal.replace(/\/{2,}/ig, "/")
    dateVal = dateVal.replace(/-{2,}/ig, "-")
    setValue(dateVal);
  }

  const keyDown = e => {
    switch ( e.keyCode ) {
      case 13: onBlur(); 
        setTimeout(() => setShowPicker(false), 700);
        e.target.blur();
        break;
      case 27: clearInput(); break;

      default: return;
    }
    
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
    setShowPicker(false)
    dateClear()
    // ref.current.focus();
  }

  // const localMask = lang === 'ru' ? 'дд.мм.гггг' : 'dd-mm-yyyy'
  const styleClnBtn = value || showPicker ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylePickerWrapper = showPicker ? `${styles.datePickerWrapper} ${styles.showPicker}` : `${styles.datePickerWrapper}  ${styles.hidePicker}`
  const stylePickerCloser = `${styles.pickerCloser}`

  return (
    <div className={styles.calendar} style={ width ? {width: `${width}px`} : null }>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e)}
          // placeholder = {localMask}
          placeholder = {placeholder}
          ref={ref}
          onBlur={() => onBlur()}
          onFocus={()=>onShowPicker()}
          onKeyDown={e => keyDown(e)}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>

      <div className={stylePickerWrapper}>
        <DatePicker
          lang={lang}
          value={jsDate}
          setValue={onSetDate}
          closePicker={()=>setShowPicker(false)}
        />

      </div>  

      { showPicker
        ? <div className={styles.pickerControl}>
            <button type="button" 
              className={stylePickerCloser}
              onClick={()=>{
                setShowPicker(false)
                onBlur()
              }}
            >&times;</button>
          </div>
        :null
      }  


    </div>
  )
}
