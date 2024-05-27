import React, { useEffect } from "react";
import styles from './sidebar.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary as dicts, getMainpage, nightTheme } from "../primaryPage/mainpageSlice";
import { user } from '../user/userSlice';
import { mode, root } from '../../config';
import dictionary from '../../dictionary.json';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { setPage } from "../personalArea/personalAreaSlice";

export const Sidebar = props => {
  // const { page } = props;
  // const _pathBase = testMode ? '' : `/${root}`
  const _pathBase = mode === 'local' ? '' : `/${root}`
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dicts);
  const theme = useSelector(nightTheme);
  const dispatch = useDispatch();
  useEffect(() => { if ( userData.api_key ) dispatch(getMainpage(userData.api_key)) }, [dispatch, userData.api_key]);

  const styleSidebar = theme ? `${styles.sidebar} ${styles.dark}` : `${styles.sidebar}`;

  return (
    // <aside className={styles.sidebar}>      
    <aside className={styleSidebar}> 
      {theme ? <div className={styles.themePattern}><h1>ams</h1></div> : null}     
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
          <div className={styles.lkrow}>   
              <Link to = {`${_pathBase}/`} className={styles.lkLink}>
              <FontAwesomeIcon icon={ faHouseUser }  className={`${styles.lkIkon} ${styles.home}`}  /> 
                {dictionary['PrimaryPage'][userData['lang']]}                
              </Link> 
            </div>

        { pageData.map(section => section.prefix === 'LK' 
          ? section.systems.map(system => 
            <div key={system.system_prefix} className={styles.lkrow}>             
              {/* <a href={system.request_url} className={styles.lkLink} target="_blank" rel="noreferrer">
                <div className={styles.lkIkon} style={{backgroundImage: `url(${_pathBase}/system_icons/${system.icon_filename})`}}></div> 
                {dictionary[system.system_prefix][userData['lang']]}
              </a> */}
              {/* <Link to = {`/personalArea`} className={styles.lkLink}> */}
              <Link to = {`${_pathBase}/personalArea/${system.request_url.split('/')[2]}`} className={styles.lkLink}  onClick={() => dispatch(setPage(system.request_url.split('/')[2]))}>
                <div className={styles.lkIkon} style={{backgroundImage: `url(${_pathBase}/system_icons/${system.icon_filename})`}}></div> 
                {dictionary[system.system_prefix][userData['lang']]}                
              </Link>
              {['LK_02', 'LK_06'].includes(system.system_prefix) && system.cnt !== "0" ? <p className={styles.cnt}>{system.cnt}</p> : null}
              <div className={styles.lkHint}>{system.request_name}</div>               
            </div>
          )
          : null)
        }        
      </div>
      
    </aside>
  )
}

