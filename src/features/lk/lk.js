import React, { useEffect } from "react";
import styles from './lk.module.scss';
import { useSelector, useDispatch } from "react-redux";
import LangButton from "../mainpage/langButton";
import { user, setLang } from '../user/userSlice';
import { useParams } from "react-router-dom";
import { getMyorders, getMyarchive, getMyexecarch, setPage, sorted } from "./lkSlice";
import { Tr } from "./tr/tr";
import dictionary from '../../dictionary.json';
import { Link } from 'react-router-dom';
import { testMode, root } from '../../config';

export const Lk = () => {
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);
  const { page } = useParams();
  const dispatch = useDispatch();
  const _pathBase = testMode ? '' : `/${root}`

  useEffect(() => {
    dispatch(setPage(page)) 
    if ( userData.api_key ) {
      dispatch(getMyorders(userData.api_key)) 
      dispatch(getMyarchive(userData.api_key))
      dispatch(getMyexecarch(userData.api_key))
    }
  }, [dispatch, page, userData]);

  const langBtnRu = userData['lang'] === 'RU' ? `${styles.langBtns} ${styles.active}` : `${styles.langBtns}`
  const langBtnEn = userData['lang'] === 'EN' ? `${styles.langBtns} ${styles.active}` : `${styles.langBtns}`

  return (
    <section className={styles.lk}>
      { sortedData.length !== 0
        ? <div className={styles.blank}>
            <h1 className={styles.header}>{dictionary['lk_header'][userData['lang']]}</h1>
            <div className={styles.info}>
              <p>{dictionary['lk_createdBy'][userData['lang']]}: <span className={styles.login}>{userData.shortname} ({userData.ad_user})</span></p>
              {/* <LangButton/> */}
              <div className={styles.control}>
                <Link to = {`${_pathBase}/`} className={styles.lkLink}>
                  {dictionary['lk_toMain'][userData['lang']]}                
                </Link> 
                <button type='button' className={langBtnRu} onClick={() => dispatch(setLang({'app12_id': userData['id'], 'lang': 'RU', 'api_key': userData.api_key}))}>RU</button>
                <button type='button' className={langBtnEn} onClick={() => dispatch(setLang({'app12_id': userData['id'], 'lang': 'EN', 'api_key': userData.api_key}))}>EN</button>
              </div>
            </div>
            
            <div>
              <table className={styles.table}>
                <thead  className={styles.thead}>
                  <tr>
                    <th style={{width: '80px'}}>{dictionary['lk_th_number'][userData['lang']]}</th>
                    <th style={{width: '130px'}}>{dictionary['lk_th_createDate'][userData['lang']]}</th>
                    <th style={{width: '180px'}}>{dictionary['lk_th_requestType'][userData['lang']]}</th>
                    <th style={{width: '180px'}}>{dictionary['lk_th_oderUser'][userData['lang']]}</th>
                    <th style={{width: '330px'}}>{dictionary['lk_th_privs'][userData['lang']]}</th>
                    <th style={{width: '130px'}}>{dictionary['lk_th_status'][userData['lang']]}</th>
                    <th style={{width: '210px'}}>{dictionary['lk_th_action'][userData['lang']]}</th>
                  </tr>            
                </thead>
                <tbody>
                  {sortedData.map( (order, index) => 
                    <Tr key={index} order={order} />
                  )}            
                </tbody>

              </table>        
            </div>

          </div>
        : null
      }



      
    </section>
  )
}
