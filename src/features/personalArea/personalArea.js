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
import { getMyorders, myorders, sorted } from "./personalAreaSlice";
import { getDate } from "../../helpers";

export const PersonalArea = () => {
  const userData = useSelector(user);
  const myordersData = useSelector(myorders);
  const sortedData = useSelector(sorted);
  const _pathBase = testMode ? '' : `/${root}`
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if ( userData.api_key ) dispatch(getMyorders(userData.api_key)) 
  }, [dispatch, userData]);

  const inProgress = ['myagree', 'myagree_settings', 'myagree_arch', 'myexec', 'myexec_arch', ].includes(page)

  const getDataString = timeStamp => {
    const date = Date(+Object.keys(timeStamp)[0]);
    
    return date
  }

  return (
    <section className={styles.personalArea}>
      <Sidebar page = 'personalAria'/>
      <main className={styles.main}>
        
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>Test Page</h1>
          <div className={styles.mobwraper}>
            <LangButton/>            
          </div>
        </header>


        { sortedData.length !== 0 && !inProgress
          ? <ul className={styles.orderList}>
            { sortedData.map((year) =>
              <li key={Object.keys(year)[0]}>
                <h2 className={styles.years}>{Object.keys(year)[0]}</h2>
                <ul>
                  { Object.values(year)[0].map((month, m_index) => <li key={m_index}>
                    <h3 className={styles.months}>{ Object.keys(month)[0] }</h3>
                    <ul>
                      { Object.values(month)[0].map(day => <li key={Object.keys(day)[0]}>
                        <h4 className={styles.days}>{ getDate(+Object.keys(day)[0]) }</h4>
                        <ul>
                          { Object.values(day)[0].map(order => <li key={`${order.order_type}${order.order_id}`}>
                          {`${order.request_number} ${order.request_type} ${order.api_status}`}
                          </li>) }
                        </ul>
                      </li>) }
                    </ul>
                  </li>)  }
                </ul>
              </li>
            )}
          </ul>
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
