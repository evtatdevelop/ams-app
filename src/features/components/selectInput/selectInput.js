import React, { useState } from "react";
import styles from './selectInput.module.scss';
import { searchUsers } from "../../user/userSliceAPI";

export const SelectInput = props => {
  const {selectHandler, placeholder, val, name} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [selectList, setSelectList] = useState([])
    
  const onSearchUsers  = (string) => {
    searchUsers({'string': string, 'api_key': 'TatarenkoEG'}).then(value => {
      console.log(value);
      setSelectList(value)
      setShow(true)
    }) 
  }

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => onSearchUsers(val), 300);
    setTimerId(timer);
  }

  const onChange = item => {
    setValue(`${item.last_name ? item.last_name : null} ${item.first_name ? item.first_name : null} ${item.middle_name ? item.middle_name : null}`);
    selectHandler(item.id)
    setShow(false)
  }

  const onFocus = e => {
    console.log(e.target.value);
    onSearchUsers(e.target.value)
  }

  const onBlur = () => setTimeout(()=>setShow(false), 100)
  const clearInput = () => {
    setValue('')
    setSelectList([])
  }
  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  return (
    <div className={styles.selectInput}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          onInput={e => onInput(e.target.value)}
          onFocus={(e)=>onFocus(e)}
          onBlur={()=>onBlur()}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList}>
        {selectList 
          ? selectList.map(item => 
            <li key={`${item.id}${name}`} className={styles.itemLi}>
              <input type="radio" 
                value={item.id} 
                id={`${item.id}${name}`} 
                name={name}
                onClick={()=>onChange(item)}
              /><label htmlFor={`${item.id}${name}`}>{`
                ${item.last_name ? item.last_name : null} ${item.first_name ? item.first_name : null} ${item.middle_name ? item.middle_name : null} (${item.email ? item.email : null})
              `}</label>
            </li>
          )
          : null  
      }
      </ul>
    </div>
  )
}
