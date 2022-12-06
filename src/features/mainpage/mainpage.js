import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage, search } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
// import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";

export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const searchString = useSelector(search);
  const dispatch = useDispatch();
  useEffect(() => { 
    if ( userData.api_key ) dispatch(getMainpage(userData.api_key)) 
    setTimeout(() => onExpired(true), 12*60*60*1000)
  }, [dispatch, userData]);
  const [expired, onExpired] = useState(false);
  // 

  return (
    <section className={styles.mainpage}>
      <header></header>
      
      <main>
      <LangButton/>
        <h1 className={styles.head_systemname}>{dictionaryData.head_systemname}</h1>
        {dictionaryData.head_currentuser && userData.ad_user
          ? <div className={styles.remoteUser}> {`${dictionaryData.head_currentuser}`} {`${userData.shortname} (${userData.ad_user})`}</div>
          : null
        }

        {/* <SearchSystems/> */}

        {searchString === "" 
          ? <ul className={styles.syetems}>
              { pageData.map(section => <Section key={section.id} section={section}/>) }
            </ul>
          : <SearchList/>  
        }       
      
      </main>
      
      <footer></footer>
 

      { expired ? <ExpirationScreen/> : null }
      
    </section>
  )
}
