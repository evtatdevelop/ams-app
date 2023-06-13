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
import { getMyorders, sorted } from "./personalAreaSlice";
import { SectionYear } from "./sectionYear/sectionYear";

export const PersonalArea = () => {
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if ( userData.api_key ) dispatch(getMyorders(userData.api_key)) 
  }, [dispatch, userData]);

  const inProgress = ['myagree', 'myagree_settings', 'myagree_arch', 'myexec', 'myexec_arch', ].includes(page)

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
                { sortedData.map((year) => <SectionYear key={Object.keys(year)[0]} year={year}/>) }
              </ul>
            </section>

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
