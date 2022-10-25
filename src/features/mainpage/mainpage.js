import React, { useEffect } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage } from "./mainpageSlice";
import { user, setLang } from '../user/userSlice';
import Section from "./section";

export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getMainpage(userData['lang'])) }, [dispatch, userData]);

  return (
    <section className={styles.mainpage}>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => {dispatch(setLang( {'app12_id': userData['id'], 'lang': userData['lang'] === 'RU' ? 'EN' : 'RU'} ))}}
      >{userData['lang'] === 'RU' ? 'En' : 'Ru'}</button>

      <h1 className={styles.name}>{dictionaryData.head_systemname}</h1>
      <p className={styles.remoteUser}> {dictionaryData.head_currentuser} {userData['shortname']} ({userData['ad_user']})</p>
      <ul>
        {pageData.map(section => {
          return <Section key={section.id} section={section}/>
        })}
      </ul>
    </section>
  )
}
