import React from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { ucFirst } from "../../../helpers";
import { clearSearch } from "../mainpageSlice";

export const LangButton = () => {

  const userData = useSelector(user);
  const dispatch = useDispatch();
  const lang = userData['lang'];

  const currentRu =  lang === 'RU' ?  `${styles.current}` : null;
  const currentEn =  lang === 'EN' ?  `${styles.current}` : null;

  return (
    <div className={styles.langButton}>
      <button type="button"
        className={ currentRu }
        onClick={() => {
          dispatch(setLang( {'app12_id': userData['id'], 'lang': 'RU', 'api_key': userData.api_key} ))
          dispatch(clearSearch())
        }}
      >Ru</button> 

      <button type="button"
        className = { currentEn }
        onClick={() => {
          dispatch(setLang( {'app12_id': userData['id'], 'lang': 'EN', 'api_key': userData.api_key} ))
          dispatch(clearSearch())
        }}
      >En</button> 

    </div>

  )
}