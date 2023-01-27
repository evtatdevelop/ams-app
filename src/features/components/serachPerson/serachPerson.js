import React, {useState} from "react";
import styles from './serachPerson.module.scss';
// import { useSelector, useDispatch } from "react-redux";

export const SerachPerson = () => {

  const [value, onInput] = useState('')

  return (
    <div className={styles.serachPerson}>
      <input type="text" className={styles.input}
        value={value}
        onInput={e => onInput(e.target.value)}
        placeholder = "test field"
      />
    </div>

    
  )
}
