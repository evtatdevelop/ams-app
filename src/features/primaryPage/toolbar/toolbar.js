import React from "react";
import styles from './toolbar.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, setOrderPrefers, orderPrefers, onToolbar } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { lsGet } from "../../../helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, } from '@fortawesome/free-solid-svg-icons'
import { testMode } from "../../../config";

export const Toolbar = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();
  const _pathBase = testMode ? '' : ``;

  const dragItem = (e, systemPrefix) => {
    e.preventDefault();
    console.log(systemPrefix);
  }

  const dropItem = (e, systemPrefix) => {
    e.preventDefault();
    console.log(systemPrefix);
  }

  const mkPrefersData = (pageData, userData) => {
    
    const orderPrefersArr = []
    const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: []};
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
    return orderPrefersData.length === 0 ? prefers : orderedPrefers(orderPrefersData, prefers);
  }

  const orderedPrefers = ( order, prefers ) => {
    const newOredr = []
    order.map(item => prefers.systems.map(system => {
      if (system.system_prefix === item) newOredr.push(system)
      return true;
    }))
    prefers.systems.map(system => {
      if (!order.includes(system.system_prefix) ) newOredr.push(system)
      return true;
    })
    return {...prefers, systems: newOredr}
  }

  
  return (
    <section className={styles.toolbar}>
      <div className={styles.window}>
        <main className={styles.main}>
          <ul className={styles.systemItemList}>
            {mkPrefersData(pageData, userData).systems.map(system => 
              <li key={system.system_prefix} className={styles.systemItem}
                onMouseDown={(e)=>dragItem(e, system.system_prefix)}
                onMouseUp={(e)=>dropItem(e, system.system_prefix)}
              >
                <div className={styles.sysIcon} style={{backgroundImage: `url(./${_pathBase}system_icons/${system.icon_filename})`}}></div>      
                <div className={styles.request_name}>{system.request_name}</div>
              </li>
            )}
          </ul>

        </main>
        <div className={styles.btnSection}>
          <button type="button" onClick={() => dispatch(onToolbar(false))} className={styles.btnAccept}>
            <FontAwesomeIcon icon={ faCheck } className={styles.iconButton} />
          </button>
          <button type="button" onClick={() => dispatch(onToolbar(false))} className={styles.btnCancel}>
            <FontAwesomeIcon icon={ faBan } className={styles.iconButton} />  
          </button>          
        </div>
      </div>
      
    </section>
  )
}

