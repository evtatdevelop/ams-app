import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage, search } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
// import { Link } from 'react-router-dom';
import Navigation from '../navigation';
import { permitted } from '../../config';


export const PrimaryPage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const searchString = useSelector(search);
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

  return (
    <section className={styles.mainpage}>

      <aside className={styles.sidebar}>
        <LangButton/>
        {dictionaryData.head_currentuser && userData.ad_user
          ? <div className={styles.remoteUser}> <p>{`${dictionaryData.head_currentuser}`}<br/>{`${userData.shortname} (${userData.ad_user})`}</p></div>
          : null
        }

        <div className={styles.lk}>
          {pageData.map(section => section.prefix === 'LK' 
            ? section.systems.map(system => 
              <a key={system.system_prefix} href={system.request_url} className={styles.lkLink}>
                <div className={styles.lkIkon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div> 
                {system.request_name}
              </a>
            )
            : null)
          }          
        </div>

        
        { permitted.includes(userData.login) 
          ? <Navigation/>
          : null
        }
      </aside>

      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.head_systemname_sf}>{dictionaryData.head_systemname}</h1>
          <SearchSystems/>
        </header>
        <div className={styles.systemList}>
          {searchString === "" 
            ? <ul className={styles.sections}>
                { pageData.map(section => section.systems.length !== 0 && section.prefix !== 'LK'
                  ? <Section key={section.id} section={section}/> 
                  : null) }
              </ul>
            : <SearchList/>  
          }
        </div>
      </main>
      
      {/* <header className={styles.header}>
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

      { expired ? <ExpirationScreen/> : null } */}
      
    </section>
  )
}
