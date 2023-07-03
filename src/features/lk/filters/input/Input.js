import React, {useRef } from "react";
import styles from './input.module.scss';
import { filters, setSearchNum } from "../../lkSlice";

import { useSelector, useDispatch } from "react-redux";

export const Input = props => {
  const ref = useRef(null)
  
  const dispatch = useDispatch();
  const {placeholder} = props
  const filtersData = useSelector(filters);
  const onInput = val => {
    dispatch(setSearchNum(val))
  }
  const clearInput = () => {
    dispatch(setSearchNum(null));
    ref.current.focus();
  }

  const styleClnBtn = filtersData.searchNum ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  return (
    <div className={styles.input}>
      <input type="text" className={styles.htmInput}
        value={filtersData.searchNum ? filtersData.searchNum : ""}
        onInput={e => onInput(e.target.value)}
        placeholder = {placeholder}
        ref={ref}
      />
      {<button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
      }
    </div>
  )
}
