import React, { useEffect } from "react";
import styles from './personalArea.module.scss';
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar";
import LangButton from "../primaryPage/langButton";
import { permitted } from '../../config';
import { user } from '../user/userSlice';
import Navigation from "../navigation";
import { useParams } from "react-router-dom";
import { testMode, root } from "../../config";
import dictionary from '../../dictionary.json';
import { getMyorders, myorders } from "./personalAreaSlice";

export const PersonalArea = () => {
  const userData = useSelector(user);
  const myordersData = useSelector(myorders);
  const _pathBase = testMode ? '' : `/${root}`
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if ( userData.api_key ) dispatch(getMyorders(userData.api_key)) 
  }, [dispatch, userData]);

  return (
    <section className={styles.personalArea}>
      <Sidebar page = 'personalAria'/>
      <main className={styles.main}>
        
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>Personal Aria Test Page</h1>
          <div className={styles.mobwraper}>
            <LangButton/>            
          </div>
        </header>


        {/* { myordersData.length !== 0
          ? <ul className={styles.orderList}>
              { myordersData.map(order => <li key={order.request_number}>{`${order.date_open} ${order.request_type}`}</li>) }          
            </ul>
          : null
        }     */}
  


         
        {/* { myordersData.length === 0 */}
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
        {/* }   */}

      </main>
      { permitted.includes(userData.login) ? <Navigation page = 'mainpage'/> : null }
    </section>
  )
}
