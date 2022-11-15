import React, { useState } from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { ucFirst } from "../../../helpers";

export const LangButton = () => {

  const userData = useSelector(user);
  const dispatch = useDispatch();
  const [show, onShow] = useState(false);

  return (
    <div className={styles.langButton}>
      {/* <button type='button'
        className={styles.langSwitcher}
        onClick={() => {dispatch(setLang( {'app12_id': userData['id'], 'lang': userData['lang'] === 'RU' ? 'EN' : 'RU'} ))}}
      >{userData['lang'] === 'RU' ? 'En' : 'Ru'}</button> */}
      
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => onShow(!show)}
      >{ ucFirst(userData['lang'])}</button>
      { show 
        ? <div className={styles.dropList}>
            <input type="radio" id="langRu" name="lang" value="RU" 
              onChange={() => {
                dispatch(setLang( {'app12_id': userData['id'], 'lang': 'RU'} ))
                onShow(false)
              }}
            />
            <label htmlFor="langRu">Ru</label>

            <input type="radio" id="langEn" name="lang" value="EN" 
              onChange={() => {
                dispatch(setLang( {'app12_id': userData['id'], 'lang': 'EN'} ))
                onShow(false)
              }}
            />
            <label htmlFor="langEn">En</label>
          </div>
        : null
      }    
    </div>

  )
}