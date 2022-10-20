import React, {useEffect} from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { data, lang, getDataAsync, changeLang } from "./mainpageSlice";

export const Mainpage = () => {

  const pageData = useSelector(data);
  const language = useSelector(lang);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getDataAsync(language)) }, [dispatch, language]);

  return (
    <section className={styles.mainpage}>
      <button type='button'
        onClick={() => dispatch(changeLang())}
      >{language}</button>

      <h1>Account Management System</h1>
      <ul>
        {pageData.map(section => {
          return <p>{section.name}</p>
        })}
      </ul>
    </section>
  )
}
