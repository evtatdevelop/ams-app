import React from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { clearSearch, nightTheme } from "../mainpageSlice";

export const LangButton = () => {
  const userData = useSelector(user);
  const theme = useSelector(nightTheme);
  const dispatch = useDispatch();
  const lang = userData['lang'];

  const styleLangButton = theme ? `${styles.langButton} ${styles.dark}` : `${styles.langButton}`;

  return (
    // <div className={styles.langButton}>
    <div className={styleLangButton}>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => {
          dispatch(setLang( {'app12_id': userData['id'], 'lang': lang === 'RU' ? 'EN' : 'RU', 'api_key': userData.api_key} ))
          dispatch(clearSearch())
        }}
      >{lang === 'RU' ? 'En' : 'Ru'}</button>
      
    </div>

  )
}