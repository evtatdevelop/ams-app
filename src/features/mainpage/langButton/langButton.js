import React, { useState } from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { ucFirst } from "../../../helpers";
import { clearSearch } from "../mainpageSlice";

export const LangButton = () => {

  const userData = useSelector(user);
  const dispatch = useDispatch();
  const [show, onShow] = useState(false);
  const lang = userData['lang'];

  // console.log(userData.api_key);

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
                  dispatch(setLang( {'app12_id': userData['id'], 'lang': lang === 'RU' ? 'EN' : 'RU', 'api_key': userData.api_key} ))
                  onShow(false)
                  dispatch(clearSearch())
                }}
              >{lang === 'RU' ? 'En' : 'Ru'}</button>  
            }

          </div>
        : null
      }    
    </div>

  )
}