import React, { useState } from "react";
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
  let orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();
  const _pathBase = testMode ? '' : ``;
  const [drag, onDrag] = useState(null);
  const [ordPrefers, setOrdPrefers] = useState([...orderPrefersData]);
  

  
  const mkPrefersData = (pageData, userData) => {
    const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: []};
    const setPrefers = new Set();
    const removerTop = lsGet(`remobedTops${userData['id']}`, [])
    pageData.map(section => 
      section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES' 
      ?  section.systems.map(sytem => {
          if ( !setPrefers.has(sytem.system_prefix) && !removerTop.includes(sytem.system_prefix) ) {
            prefers.systems.push({...sytem, section_prefix: section.prefix})
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
      if (system.system_prefix === item) {
        newOredr.push(system)
      }  
      return true;
    }))
    prefers.systems.map(system => {
      if (!order.includes(system.system_prefix) ) {
        newOredr.push(system)
      }  
      return true;
    })
    return {...prefers, systems: newOredr}
  }


  const [prefers, setPrefers] = useState(mkPrefersData(pageData, userData));

  const setLocPrefers = (newOrder) => {
    const order = []
    newOrder.map(item => prefers.systems.map(system => {
      if (system.system_prefix === item) {
        order.push(system)
      }  
      return true;
    }))
    prefers.systems.map(system => {
      if (!newOrder.includes(system.system_prefix) ) {
        order.push(system)
      }  
      return true;
    })
    setPrefers({id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: order})
  }


  const dragItem = (e, systemPrefix) => {
    e.preventDefault();
    onDrag(systemPrefix);
    // onmousedown(e)
  }
  const dropItem = (e, systemPrefix) => {
    e.preventDefault();
    moveItem(systemPrefix)
  }
  const moveItem = (drop) => {
    const neword = ordPrefers.filter(item => item !== drag) 
    const newOrdPrefers = [] 
    neword.forEach(item => {
      if ( item === drop ) newOrdPrefers.push(drag)
      newOrdPrefers.push(item)
    })
    setOrdPrefers([...newOrdPrefers])
    onDrag(null)
    setLocPrefers(newOrdPrefers)
  } 
  const setNewOredrPrevs = () => {
    dispatch(setOrderPrefers([...ordPrefers]))
    localStorage.setItem(`orderPrefers${userData['id']}`, JSON.stringify([...ordPrefers])) 
    dispatch(onToolbar(false))
  }



  
  // const onmousedown = (event) => {
  //   const item = event.target.closest('li')
  //   // let shiftX = event.clientX - item.getBoundingClientRect().left;
  //   let shiftY = event.clientY - item.getBoundingClientRect().top;
  //   item.style.position = 'absolute';
  //   item.style.zIndex = 1000;
  //   document.getElementById('toolbar').append(item);
  //   moveAt(event.pageX, event.pageY);
  //   function moveAt(pageX, pageY) {
  //     // item.style.left = pageX - shiftX + 'px';
  //     item.style.top = pageY - shiftY + 'px';
  //   }
  //   function onMouseMove(event) {
  //     moveAt(event.pageX, event.pageY);
  //   }
  //   document.body.addEventListener('mousemove', onMouseMove);
  //   item.onmouseup = function() {
  //     document.removeEventListener('mousemove', onMouseMove);
  //     // item.onmouseup = null;
  //   };
  // }
  

 
  
  return (
    <section className={styles.toolbar} id="toolbar">
      <div className={styles.window} id="toolWindow">
        <main className={styles.main}>
          <ul className={styles.systemItemList}>
            {/* {mkPrefersData(pageData, userData).systems.map(system =>  */}
            {prefers.systems.map(system => 
              <li key={system.system_prefix} className={styles.systemItem}
                onMouseDown={(e) => {
                  dragItem(e, system.system_prefix)
                  // onmousedown(e)
                }}
                onMouseUp={(e)=>dropItem(e, system.system_prefix)}
              >
                <div className={`${styles.sysIcon} ${styles[system.system_prefix]}`} 
                  style={{backgroundImage: `url(./${_pathBase}system_icons/${system.icon_filename})`}}
                ></div>      
                <div className={styles.request_name}>{system.request_name}</div>
              </li>
            )}
          </ul>

        </main>
        <div className={styles.btnSection}>
          <button type="button" onClick={() =>setNewOredrPrevs()} className={styles.btnAccept}>
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

