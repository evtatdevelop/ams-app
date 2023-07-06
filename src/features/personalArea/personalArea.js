import React, { useEffect } from "react";
import styles from './personalArea.module.scss';
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar";
import LangButton from "../primaryPage/langButton";
import { permitted } from '../../config';
import { user } from '../user/userSlice';
import Navigation from "../navigation";
import { useParams } from "react-router-dom";
import dictionary from '../../dictionary.json';
import { getMyorders, getMyarchive, getMyexecarch, setPage, everyOpenClose, sorted, everyClose } from "./personalAreaSlice";
import { SectionYear } from "./sectionYear/sectionYear";
import { SearchBar } from "./searchBar/searchBar";
import { FlasInfo } from "./flashInfo/flashInfo";

export const PersonalArea = () => {
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);
  const allClosed = useSelector(everyClose);
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(page)) 
    if ( userData.api_key ) {
      dispatch(getMyorders(userData.api_key)) 
      dispatch(getMyarchive(userData.api_key))
      dispatch(getMyexecarch(userData.api_key))
    }
  }, [dispatch, page, userData]);

  const inProgress = ['myagree', 'myagree_settings', 'myexec' ].includes(page)
  const styleOpenCloseBtn = !allClosed ? `${styles.openCloseBtn}` : `${styles.openCloseBtn} ${styles.open}`

  return (
    <section className={styles.personalArea}>
      <Sidebar page = 'personalAria'/>
      <main className={styles.main}>
        
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>{dictionary[page][userData['lang']]}</h1>
          <div className={styles.mobwraper}>
            <LangButton/>            
          </div>
        </header>


        { sortedData.length !== 0 && !inProgress
          ? <section className={styles.myordersSectioon}>
              
              <ul className={styles.orderList}>
                <li><button type="button" className={styleOpenCloseBtn} 
                  onClick={()=>dispatch(everyOpenClose())}></button></li>
                { sortedData.map((year) => <SectionYear key={Object.keys(year)[0]} year={year}/>) }
              </ul>

            </section>
          : null
        }    


        { !inProgress
          ? <div className={styles.searchBar}>
              <SearchBar/>
            </div>
          : null
        }  


        { inProgress
          ? <div className={styles.testLink}>
              <div className={styles.robot}></div>
              <div>
                <p>{dictionary['inProgress'][userData['lang']]}</p>
                <a href={`https://request.sibgenco.local/lk/${page}`} target="_blank" rel="noreferrer">
                {dictionary['whatLooking'][userData['lang']]}<span>{dictionary['here'][userData['lang']]}</span>
                </a>
              </div>
            </div>
          : null
        }  


      </main>

     <FlasInfo/> 
      
      { permitted.includes(userData.login) ? <Navigation page = 'mainpage'/> : null }
    </section>
  )
}
