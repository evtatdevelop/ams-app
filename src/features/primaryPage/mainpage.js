import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, prefers, dictionary as dicts, getMainpage, search, 
  contextMenu, offContextMenu, notification } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
import { permitted } from '../../config';
import { Link } from 'react-router-dom';
import { testMode } from "../../config";
import ContextMenu from "./contextMenu";
import Notification from "./notification";
import dictionary from '../../dictionary.json';
// import Navigation from "../navigation";

export const PrimaryPage = () => {
  const _pathBase = testMode ? '' : '/ams';
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  // const prefersData = useSelector(prefers);
  const dictionaryData = useSelector(dicts);
  const searchString = useSelector(search);
  const notice = useSelector(notification);
  const dataContextMenu = useSelector(contextMenu);
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

  const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: []};
  
  const setPrefers = new Set();
  pageData.map(section => {
    if ( section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES') {
      section.systems.map(sytem => {
        if ( !setPrefers.has(sytem.system_prefix) ) {
          const newSystem = {...sytem, section_prefix: section.prefix}
          
          prefers.systems.push(newSystem)
        }
        setPrefers.add(sytem.system_prefix)
      })

    }
  })

  return (
    <section className={styles.mainpage}
      onClick={()=>dispatch(offContextMenu())}
    >

      <aside className={styles.sidebar}>      
        <div className={styles.logPrsn}>
          {dictionaryData.head_currentuser && userData.ad_user
            ? <>
                <div className={styles.remoteUser}>
                  <p className={styles.name}>{userData.shortname}</p>
                  <p className={styles.domain}>{userData.ad_user}</p>
                </div>
                <div className={styles.remoteSimple}>
                  {`${userData.first_name[0]}${userData.last_name[0]}`}
                  <div className={styles.remoteHint}>
                    <p className={styles.hintName}>{userData.shortname}</p>
                    <p className={styles.hintDomain}>{userData.ad_user}</p>
                  </div>
                </div>
              </>
            : null
          }
        </div>

        <div className={styles.lk}>
          {pageData.map(section => section.prefix === 'LK' 
            ? section.systems.map(system => 
              <div key={system.system_prefix} className={styles.lkrow}>
                <a href={system.request_url} className={styles.lkLink}>
                  <div className={styles.lkIkon} style={{backgroundImage: `url(${_pathBase}/system_icons/${system.icon_filename})`}}></div> 
                  {dictionary[system.system_prefix][userData['lang']]}
                </a>
                <p className={styles.cnt}>{system.cnt}</p>
                <div className={styles.lkHint}>{system.request_name}</div>               
              </div>

            )
            : null)
          }          
        </div>

        <div className={styles.backLink}>
          { permitted.includes(userData.login) 
            ? <Link to = {`${_pathBase}/`}>&lt; Back</Link>
            : null
          } 
          {/* <Link to = {`${_pathBase}/mainpage`}>&lt; Back</Link>
          <Link to = '/personalArea'>PersonalArea</Link>
          <Link to = '/workplace'>Workplace</Link>
          <Link to = '/resources'>Resources</Link>
          <Link to = '/components'>Components</Link>
          <Link to = '/apiTests'>API Tests</Link>         */}
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>{dictionaryData.head_systemname}</h1>
          <SearchSystems/>
          <LangButton/>
        </header>
        <div className={styles.systemList} onScroll={()=>dispatch(offContextMenu())}>
          {searchString === "" 
            ? <ul className={styles.sections}>

                <Section key="prefers" section={prefers}/>

                { pageData.map(section => section.systems.length !== 0 
                  && section.prefix !== 'LK' 
                  && section.prefix !== 'TOP_ORDERS' 
                  && section.prefix !== 'FAVORITES' 
                  ? <Section key={section.id} section={section}/> 
                  : null) }
              </ul>
            : <SearchList/>  
          }
          { notice ? <Notification/> : null}
        </div>
      </main>

      <ContextMenu data = {dataContextMenu} />

      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
