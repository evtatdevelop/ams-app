import React from "react";
import styles from './selectInput.module.scss';
import Input from "../input";

export const SelectInput = props => {
  const {inputHandler, placeholder, selectList} = props

  return (
    <div className={styles.selectInput}>
      <Input 
        inputHandler = {inputHandler}
        placeholder = {placeholder}
      />
      <ul className={styles.selectList}>
        {selectList.map(item => 
          <li key={item.id} className={styles.itemLi}>
            <input type="radio" value={item.id} id={item.id} name="selectlist"
              onChange={()=>inputHandler(item.name)}
            /><label htmlFor={item.id}>{item.name}</label>
          </li>
        )}
      </ul>
    </div>
  )
}
