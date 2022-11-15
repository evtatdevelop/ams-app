import React, { useState } from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { ucFirst } from "../../../helpers";

export const LangButton = () => {

  const userData = useSelector(user);
  const dispatch = useDispatch();
  const [show, onShow] = useState(false);
  const lang = userData['lang'] === 'RU' ? 'EN' : 'RU';

  return (
    <div className={styles.langButton}>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => onShow(!show)}
      >{ ucFirst(lang)}</button>
      { show 
        ? <div className={styles.dropList}>
            { 
              <button type="button"
                onClick={() => {
                  dispatch(setLang( {'app12_id': userData['id'], 'lang': lang === 'RU' ? 'EN' : 'RU'} ))
                  onShow(false)
                }}
              >{lang === 'RU' ? 'EN' : 'RU'}</button>  
            }

          </div>
        : null
      }    
    </div>

  )
}