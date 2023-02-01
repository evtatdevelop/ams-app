import React, { useState } from "react";
import styles from './selectInput.module.scss';

export const SelectInput = props => {
  const {selectHandler, placeholder, selectList, val, name} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false)
  const [timerId, setTimerId] = useState(null)

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => console.log(val), 500);
    setTimerId(timer);
  }

  const onChange = item => {
    setValue(item.name);
    selectHandler(item.id)
    setShow(false)
  }
  const onBlur = () => setTimeout(()=>setShow(false), 100)
  const clearInput = () => setValue('')
  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  return (
    <div className={styles.selectInput}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          onInput={e => onInput(e.target.value)}
          onClick={()=>setShow(true)}
          onFocus={()=>setShow(true)}
          onBlur={()=>onBlur()}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList}>
        {selectList.map(item => 
          <li key={`${item.id}${name}`} className={styles.itemLi}>
            <input type="radio" 
              value={item.id} 
              id={`${item.id}${name}`} 
              name={name}
              onClick={()=>onChange(item)}
            /><label htmlFor={`${item.id}${name}`}>{item.name}</label>
          </li>
        )}
      </ul>
    </div>
  )
}