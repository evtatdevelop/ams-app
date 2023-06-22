import React, { useEffect, useRef } from "react";
import styles from './personalArea.module.scss';
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar";
import LangButton from "../primaryPage/langButton";
import { permitted } from '../../config';
import { user } from '../user/userSlice';
import Navigation from "../navigation";
import { useParams } from "react-router-dom";
import dictionary from '../../dictionary.json';
import { getMyorders, getMyarchive, getMyexecarch, setPage, everyOpenClose, sorted, everyClose, setSearchStat, filters, clearSearch } from "./personalAreaSlice";
import { SectionYear } from "./sectionYear/sectionYear";
import Input from "./input";
import DateInterval from "./dateInterval";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'

export const PersonalArea = () => {
  const ref = useRef(null)
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);
  const allClosed = useSelector(everyClose);
  const filtersData = useSelector(filters);
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

  const inProgress = ['myagree', 'myagree_settings', 'myexec', 'myexec_arch' ].includes(page)

  const styleOpenCloseBtn = !allClosed ? `${styles.openCloseBtn}` : `${styles.openCloseBtn} ${styles.open}`

  let styleOnOffAgreed = ''
  let styleOnOffRefused = ''
  let styleOnOffInProgress = ''

  if ( filtersData.searchNoStatus && filtersData.searchNoStatus.length > 0 ) {
    styleOnOffAgreed = filtersData.searchNoStatus.includes('agreed') ? `${styles.off}` : ''
    styleOnOffRefused = filtersData.searchNoStatus.includes('refused') ? `${styles.off}`: ''
    styleOnOffInProgress = filtersData.searchNoStatus.includes('inprogress') ? `${styles.off}` : ''
  }

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
              
              <Input placeholder = {dictionary['searchAppNum'][userData['lang']]}/>
              
              <p className={styles.saerchCaption}>{dictionary['searchStatus'][userData['lang']]}</p>
              <nav className={styles.searchStatus}>
                <button type="bytton" className={`${styles.serchStatBtn} ${styles.agreed} ${styleOnOffAgreed}`} 
                  title={dictionary['agreed'][userData['lang']]}
                  onClick={() => dispatch(setSearchStat('agreed'))}
                ><FontAwesomeIcon icon={ faCheck }/></button>
                <button type="bytton" className={`${styles.serchStatBtn} ${styles.refused} ${styleOnOffRefused}`} 
                  title={dictionary['refused'][userData['lang']]}
                  onClick={() => dispatch(setSearchStat('refused'))}
                ><FontAwesomeIcon icon={ faXmark }/></button>
                <button type="bytton" className={`${styles.serchStatBtn} ${styles.inprogress} ${styleOnOffInProgress}`} 
                  title={dictionary['inprogress'][userData['lang']]}
                  onClick={() => dispatch(setSearchStat('inprogress'))}
                ><FontAwesomeIcon icon={ faArrowRight }/></button>
              </nav>
              
              <p className={styles.saerchCaption}>{dictionary['timePeriod'][userData['lang']]}</p>
              <DateInterval lang={userData['lang']}/>

              
              
              <button type="button" className={styles.clearSearchBtn}
                onClick={ () => dispatch(clearSearch()) }
              >{dictionary['clearSearchBtn'][userData['lang']]}</button>

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
      { permitted.includes(userData.login) ? <Navigation page = 'mainpage'/> : null }
    </section>
  )
}
