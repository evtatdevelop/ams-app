import React, { useState, useEffect } from "react";
import styles from './select.module.scss';
import { filters, setSearchType, orderTypes } from "../personalAreaSlice";
import { useSelector, useDispatch } from "react-redux";

export const Select = props => {
  const {placeholder, name, lang} = props
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)
  
  const dispatch = useDispatch();
  const orderTypesData = useSelector(orderTypes);

  const onChange = item => {
    setValue(item.name)
    dispatch(setSearchType(item.id))
    setShow(false)
  }
  const onBlur = () => setTimeout(()=>setShow(false), 100)
  
  const clearInput = () => {
    setValue('')
    dispatch(setSearchType(null))
  }
  
  const { searchType } = useSelector(filters)
  
  useEffect(() => {
    if ( !searchType ) setValue('')
  }, [searchType])

 


  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  return (
    <div className={styles.select}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          readOnly={true}
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
        {orderTypesData.map(item => 
          <li key={`${item.id}${name}`} className={styles.itemLi}>
            <input type="radio" 
              value={item.id} 
              id={`${item.id}${name}`} 
              name={name}
              onClick={()=>onChange(item)}
            /><label htmlFor={`${item.id}${name}`}>{lang === 'RU' ? item.name : item.name_en}</label>
          </li>
        )}
      </ul>
    </div>
  )
}
