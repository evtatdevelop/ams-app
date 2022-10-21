import React, { useEffect } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, getMainpage } from "./mainpageSlice";
import { user, lang, changeLang } from '../user/userSlice';
import Section from "./section";

export const Mainpage = () => {

  const pageData = useSelector(mainpage);
  const language = useSelector(lang);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getMainpage(language)) }, [dispatch, language]);

  return (
    <section className={styles.mainpage}>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => dispatch(changeLang())}
      >{language === 'ru' ? 'En' : 'Ru'}</button>

      <h1 className={styles.name}>Account Management System</h1>
      <ul>
        {pageData.map(section => {
          return <Section key={section.id} section={section}/>
        })}
      </ul>
    </section>
  )
}
