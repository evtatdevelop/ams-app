import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary as dicts, getMainpage, search, 
  offContextMenu, notification, fastaccess, onFastShow, 
} from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
import ContextMenu from "./contextMenu";
import Notification from "./notification";
import FastAccess from "./fastAccess";
import Navigation from "../navigation";
import { permitted } from '../../config';
import PageSettings from "./pageSettings";
import Prefers from "./prefers";
import Sidebar from "../sidebar";

export const PrimaryPage = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dicts);
  const searchString = useSelector(search);
  const notice = useSelector(notification);
  const fastSection = useSelector(fastaccess);
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
    <section className={styles.mainpage} onClick={()=>{ dispatch(offContextMenu()) }} >

      <Sidebar/>

      <main className={styles.main} onClick={()=>dispatch(onFastShow(false))}>
        
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>{dictionaryData.head_systemname}</h1>
          <div className={styles.mobwraper}>
            <SearchSystems/>
            <LangButton/>            
          </div>
        </header>

        <div className={styles.systemList} onScroll={()=>{
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
                    <Prefers/>
                    { pageData.map(section => section.systems.length !== 0 && section.prefix !== 'LK' 
                      && section.prefix !== 'TOP_ORDERS' && section.prefix !== 'FAVORITES' 
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

      <FastAccess/>
      <ContextMenu/> 
      <PageSettings/>
      { expired ? <ExpirationScreen/> : null }
      { permitted.includes(userData.login) 
        ? <Navigation page = 'primaryPage'/>
        : null
      }

    </section>
  )
}

