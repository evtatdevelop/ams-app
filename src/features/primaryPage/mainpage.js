import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary as dicts, getMainpage, search, 
  contextMenu, offContextMenu, notification, fastaccess, onFastShow, 
  setOrderPrefers, orderPrefers } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
import { root} from '../../config';
import { testMode } from "../../config";
import ContextMenu from "./contextMenu";
import Notification from "./notification";
import dictionary from '../../dictionary.json';
import FastAccess from "./fastAccess";
import Navigation from "../navigation";
import { permitted } from '../../config';
import PageSettings from "./pageSettings";
import { lsGet } from "../../helpers";

export const PrimaryPage = () => {
  const _pathBase = testMode ? '' : `/${root}`
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dicts);
  const searchString = useSelector(search);
  const notice = useSelector(notification);
  const dataContextMenu = useSelector(contextMenu);
  const fastSection = useSelector(fastaccess);
  const orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderPrefers(lsGet(`orderPrefers${userData['id']}`, [])))
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


  const mkPrefersData = (pageData, userData) => {
    const orderPrefersArr = []
    const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][pageData['lang']], systems: []};
    const setPrefers = new Set();
    const removerTop = lsGet(`remobedTops${userData['id']}`, [])
    pageData.map(section => 
      section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES' 
      ?  section.systems.map(sytem => {
          if ( !setPrefers.has(sytem.system_prefix) && !removerTop.includes(sytem.system_prefix) ) {
            prefers.systems.push({...sytem, section_prefix: section.prefix})
            orderPrefersArr.push(sytem.system_prefix)
          }
          setPrefers.add(sytem.system_prefix)
          return null
        })
      : null
    )
    return orderPrefersData.length === 0 ? prefers : orderedPrefers(prefers);
  }

  const orderedPrefers = ( prefers ) => {
    console.log(prefers);
    return prefers
  }

  return (
    <section className={styles.mainpage} onClick={()=>{ dispatch(offContextMenu()) }} >

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
          { pageData.map(section => section.prefix === 'LK' 
            ? section.systems.map(system => 
              <div key={system.system_prefix} className={styles.lkrow}>
                <a href={system.request_url} className={styles.lkLink} target="_blank" rel="noreferrer">
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
      </aside>

      <main className={styles.main} onClick={()=>dispatch(onFastShow(false))}>

        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>{dictionaryData.head_systemname}</h1>
          <div className={styles.mobwraper}>
            <SearchSystems/>
            <LangButton/>            
          </div>
        </header>

        <div className={styles.systemList} 
          onScroll={()=>{
            dispatch(offContextMenu())
            dispatch(onFastShow(false))
          }}>
          { searchString === "" 
            ? <ul className={styles.sections}>
              { fastSection
                ? pageData.map(section => section.id === fastSection 
                  ? <Section key={section.id} section={section}/> 
                  : null)
                : <>
                  <Section key="prefers" section={mkPrefersData(pageData, userData)}/>
                  { pageData.map(section => section.systems.length !== 0 
                    && section.prefix !== 'LK' 
                    && section.prefix !== 'TOP_ORDERS' 
                    && section.prefix !== 'FAVORITES' 
                    ? <Section key={section.id} section={section}/> 
                    : null) 
                  }
                </>
              }
            </ul>
            : <SearchList/>  
          }

          { notice ? <Notification/> : null}
        </div>
      </main>

      { <FastAccess/> }
      <ContextMenu data = {dataContextMenu} /> 
      <PageSettings/>
      { expired ? <ExpirationScreen/> : null }
      { permitted.includes(userData.login) 
        ? <Navigation page = 'primaryPage'/>
        : null
      }

    </section>
  )
}

