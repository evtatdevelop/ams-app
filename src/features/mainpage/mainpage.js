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
  // useEffect(() => { dispatch(getMainpage(userData['lang'])) }, [dispatch, userData]);
  useEffect(() => { dispatch(getMainpage()) }, [dispatch, userData]);

  return (
    <section className={styles.mainpage}>

      <header className={styles.header}>

        <h1 className={styles.head_systemname}>{dictionaryData.head_systemname}</h1>
        
        {dictionaryData.head_currentuser && userData.ad_user
          ? <p className={styles.remoteUser}> {`${dictionaryData.head_currentuser}`}<br/>{`${userData.shortname} (${userData.ad_user})`} </p>
          : null
        }

        <input className={styles.search} type="search" id="search" name="search" placeholder="Search"/>

        <button type='button'
          className={styles.langSwitcher}
          onClick={() => {dispatch(setLang( {'app12_id': userData['id'], 'lang': userData['lang'] === 'RU' ? 'EN' : 'RU'} ))}}
        >{userData['lang'] === 'RU' ? 'En' : 'Ru'}</button>            

      </header>

      
      <ul className={styles.syetems}>
        {pageData.map(section => {
          return <Section key={section.id} section={section}/>
        })}
      </ul>


    </section>
  )
}
