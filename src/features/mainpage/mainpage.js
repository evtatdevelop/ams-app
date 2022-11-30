import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage, search } from "./mainpageSlice";
// import { user, updateTimeout, timeout } from '../user/userSlice';
import { user } from '../user/userSlice';
import Section from "./section";
import RowSection from "./rowSection";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";

export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const searchString = useSelector(search);
  // const expired = useSelector(timeout);
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getMainpage(userData.api_key)) 
    setTimeout(() => onExpired(true), 12*60*60*1000)
    // setTimeout(() => onExpired(true), 15*1000)
    // dispatch(updateTimeout())
  }, [dispatch, userData]);
  const [expired, onExpired] = useState(false);
  // 

  return (
    <section className={styles.mainpage}>

      <header className={styles.header}>
        <h1 className={styles.head_systemname}>{dictionaryData.head_systemname}</h1>
        
        {dictionaryData.head_currentuser && userData.ad_user
          ? <div className={styles.remoteUser}> <p>{`${dictionaryData.head_currentuser}`}<br/>{`${userData.shortname} (${userData.ad_user})`}</p></div>
          : null
        }

        <SearchSystems/>
        <LangButton/>

      </header>

        {searchString === "" 
          ? <ul className={styles.syetems}>
              <RowSection 
                key='qweqwq' 
                sections={pageData.filter(section => section.prefix === 'LK' || section.prefix === 'CORPORATE')
              }/>

              { pageData
                .filter(section => section.prefix !== 'LK' && section.prefix !== 'CORPORATE')
                .map(section => <Section key={section.id} section={section}/>)
              }
            </ul>
          : <SearchList/>  
        }  

        { expired ? <ExpirationScreen/> : null }
        

    </section>
  )
}
