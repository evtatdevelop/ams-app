import React, { useEffect } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import RowSection from "./rowSection";
import LangButton from "./langButton";

export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const dispatch = useDispatch();
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

        <LangButton/>

      </header>

      <ul className={styles.syetems}>
        <RowSection 
          key='qweqwq' 
          sections={pageData.filter(section => section.prefix === 'LK' || section.prefix === 'CORPORATE')
        }/>

        { pageData
          .filter(section => section.prefix !== 'LK' && section.prefix !== 'CORPORATE')
          .map(section => <Section key={section.id} section={section}/>)
        }
      </ul>
    </section>
  )
}
