import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage, search, hint } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
// import { Link } from 'react-router-dom';
import Navigation from '../navigation';
import { permitted } from '../../config';
import Hint from "./hint";


export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const searchString = useSelector(search);
  const dataHint = useSelector(hint);
  const dispatch = useDispatch();
  useEffect(() => { 
    if ( userData.api_key ) dispatch(getMainpage(userData.api_key)) 
    setTimeout(() => {
      onExpired(true)
      document.body.style.overflow = "hidden"
    }, 
    12*60*60*1000
    // 12*1000
    )
  }, [dispatch, userData]);
  const [expired, onExpired] = useState(false);
  // const [hint, onHint] = useState({
  //   text: '<h1>text<br>test</h1>',
  //   top: 300, 
  //   left: 300
  // });

  return (
    <section className={styles.mainpage}>
      
      <header className={styles.header}>
        {/* <h1 className={styles.head_systemname}>{dictionaryData.head_systemname}</h1> */}
        <h1 className={styles.head_systemname_sf}>{dictionaryData.head_systemname}</h1>
        {dictionaryData.head_currentuser && userData.ad_user
          ? <div className={styles.remoteUser}> <p>{`${dictionaryData.head_currentuser}`}<br/>{`${userData.shortname} (${userData.ad_user})`}</p></div>
          : null
        }
        <SearchSystems/>
        <LangButton/>
      </header>

      { permitted.includes(userData.login) 
        ? <Navigation/>
        : null
      }

      {searchString === "" 
        ? <ul className={styles.syetems}>
            { pageData.map(section => <Section key={section.id} section={section}/>) }
          </ul>
        : <SearchList/>  
      }

      <Hint data = {dataHint} />

      { expired ? <ExpirationScreen/> : null }
      
    </section>
  )
}
