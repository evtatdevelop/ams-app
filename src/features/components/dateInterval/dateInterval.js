/* eslint-disable no-useless-escape */
import React, {useState, useRef } from "react";
import styles from './dateInterval.module.scss';
import DatePicker from "./datePicker";

export const DateInterval = props => {
  const ref = useRef(null)
  const {dateHandler, lang} = props
  
  const [value, setValue] = useState("")
  const [jsDateFrom, setJsDateFrom] = useState(null)
  const [jsDateTill, setJsDateTill] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  const onShowPicker = () => setShowPicker(true)

  const onSetDate = date => {
    if ( !date ) { 
      setValue(''); 
      setJsDateFrom(null); 
      setJsDateTill(null); 
      return 
  }
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    const strDate = lang === 'ru' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`


    let splitVal = value.split(' - ')
    console.log( splitVal );

    if ( !splitVal[0] ) {
      setJsDateFrom(date)
      setValue(`${strDate} - `)
    } else { 
      setJsDateTill(date)
      splitVal[1] = strDate 
      setValue(splitVal.join(' - '))  
    }

    dateHandler(date)
  }
  // const onSetDateTill = date => {
  //   if ( !date ) { setValue(''); setJsDateTill(null); return }
  //   setJsDateTill(date)
  //   const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  //   const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
  //   const strDate = lang === 'ru' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`
    
  //   let splitVal = value.split(' - ')
  //   console.log(splitVal);

  //   if ( !splitVal[1] ) {
  //     const today = new Date();
  //     const dd = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
  //     const mm = today.getMonth()+1 > 9 ? today.getMonth()+1 : `0${today.getMonth()+1}`
  //     const strToday = lang === 'ru' ? `${dd}.${mm}.${today.getFullYear()}` : `${dd}-${mm}-${today.getFullYear()}`
  //     console.log(strToday);
  //     splitVal[0] = strToday 
  //   }
  //   splitVal[1] = strDate 
  //   setValue(splitVal.join(' - '))   
    
  //   dateHandler(date)
  // }


  const onInput = val => {
    // let dateVal = val.replace(/[^0-9\.\/-: ]/ig, "")
    // dateVal = dateVal.replace(/\.{2,}/ig, ".")
    // dateVal = dateVal.replace(/\/{2,}/ig, "/")
    // dateVal = dateVal.replace(/-{2,}/ig, "-")
    // setValue(dateVal);
    setValue(val);
  }

  const onBlur = () => {
    // let val;
    // if ( /\./.test(value) ) val = value.split('.');
    // if ( /-/.test(value) ) val = value.split('-');
    // if ( /\//.test(value) ) val = value.split('/');
    // if ( !val || val.length !== 3) { onSetDate(null); return }
    // const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    // if ( !inputDate.getTime() ) { onSetDate(null); return }
    // onSetDate(inputDate)
  }

  const clearInput = () => {
    onSetDate(null)
    setShowPicker(false)
  }

  const localMask = lang === 'ru' ? 'дд.мм.гггг - дд.мм.гггг' : 'dd-mm-yyyy - dd-mm-yyyy'
  const styleClnBtn = value || showPicker ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylePickerWrapper = showPicker ? `${styles.datePickerWrapper} ${styles.showPicker}` : `${styles.datePickerWrapper}  ${styles.hidePicker}`
  const stylePickerCloser = `${styles.pickerCloser}`

  return (
    <div className={styles.dateInterval}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {localMask}
          ref={ref}
          onBlur={() => onBlur()}
          onFocus={()=>onShowPicker()}
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
          valueFrom={jsDateFrom}
          valueTill={jsDateTill}
          setValue={onSetDate}
          closePicker={()=>setShowPicker(false)}
        />

        <div className={styles.pickerControl}>
          <button type="button" 
            className={stylePickerCloser}
            onClick={()=>{
              setShowPicker(false)
              onBlur()
            }}
          >&times;</button>
        
        </div>
      </div>  
    </div>
  )
}
