import React, { useEffect } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, getMainpage } from "./mainpageSlice";
import { user, setLang } from '../user/userSlice';
import Section from "./section";

export const Mainpage = () => {

  const userData = useSelector(user);
  console.log(userData);
  const pageData = useSelector(mainpage);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getMainpage(userData['lang'])) }, [dispatch, userData]);

  return (
    <section className={styles.mainpage}>
      <button type='button'
        className={styles.langSwitcher}
        // onClick={() => dispatch(changeLang())}
        onClick={() => {dispatch(setLang( {'app12_id': userData['id'], 'lang': userData['lang'] === 'RU' ? 'EN' : 'RU'} ))}}
      >{userData['lang'] === 'RU' ? 'En' : 'Ru'}</button>

      <h1 className={styles.name}>Account Management System</h1>
      <ul>
        {pageData.map(section => {
          return <Section key={section.id} section={section}/>
        })}
      </ul>
    </section>
  )
}
