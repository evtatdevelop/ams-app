import React, { useState } from "react";
import styles from './toolbar.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, setOrderPrefers, orderPrefers, onToolbar } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { lsGet } from "../../../helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, } from '@fortawesome/free-solid-svg-icons'

export const Toolbar = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  let orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();
  const _pathBase = ``;
  const [drag, onDrag] = useState(null);
  const [ordPrefers, setOrdPrefers] = useState([...orderPrefersData]);
    
  const mkPrefersData = (pageData, userData) => {
    const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: []};
    const setPrefers = new Set();
    const removerTop = userData['id'] ? lsGet(`remobedTops${userData['id']}`, []) : []
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
      if (system.system_prefix === item) newOredr.push(system)
      return true;
    }))
    prefers.systems.map(system => {
      if (!order.includes(system.system_prefix) ) newOredr.push(system) 
      return true;
    })
    return {...prefers, systems: newOredr}
  }

  const [prefers, setPrefers] = useState(mkPrefersData(pageData, userData));

  const setLocPrefers = (newOrder) => {
    const order = []
    newOrder.map(item => prefers.systems.map(system => {
      if (system.system_prefix === item) order.push(system) 
      return true;
    }))
    prefers.systems.map(system => {
      if (!newOrder.includes(system.system_prefix) ) order.push(system)
      return true;
    })
    setPrefers({id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: order})
  }

  const moveItem = (drag, drop) => {
    const neword = ordPrefers.filter(item => item !== drag) 
    const newOrdPrefers = [] 
    neword.forEach(item => {
      if ( item === drop ) newOrdPrefers.push(drag)
      newOrdPrefers.push(item)
    })
    setOrdPrefers([...newOrdPrefers])
    setLocPrefers(newOrdPrefers)
  } 

  const setNewOredrPrevs = () => {
    dispatch(setOrderPrefers([...ordPrefers]))
    localStorage.setItem(`orderPrefers${userData['id']}`, JSON.stringify([...ordPrefers])) 
    dispatch(onToolbar(false))
  }

  const onmousedown = (event, systemPrefix) => {
    event.preventDefault();
    onDrag(systemPrefix)

    const item = event.target.closest('li')
    const itemRect = item.getBoundingClientRect();
    const img = item.querySelector(`.${systemPrefix.replace(/[0-9]/g, '')}`).getAttribute('style').split('/')[2].slice(0,-3)

    let icon = document.createElement('div');
    icon.style.height = '30px';
    icon.style.width = '100px';
    icon.style.backgroundSize = 'cover';
    icon.style.backgroundImage = `url(system_icons/${img})`
    icon.style.backgroundRepeat = 'no-repeat'

    let shiftX = event.clientX - itemRect.left;
    let shiftY = event.clientY - itemRect.top;  
    let dragItem = document.createElement('div');
    dragItem.style.width = itemRect.width + 'px';
    dragItem.style.height = itemRect.height + 'px';
    dragItem.style.border = `1px solid white`;
    dragItem.style.backgroundColor = '#16161995';
    dragItem.style.left = event.pageX - shiftX + 'px';
    dragItem.style.top = event.pageY - shiftY + 'px';

    dragItem.style.paddingLeft = '.3%';
    dragItem.style.paddingTop = '.7%';
    dragItem.append(icon)

    dragItem.style.position = 'absolute';
    dragItem.style.zIndex = 1000;

    document.body.append(dragItem)
    moveAt(event.pageX, event.pageY)
    function moveAt(pageX, pageY) {  dragItem.style.top = pageY - shiftY + 'px' }
    function onMouseMove(event) { moveAt(event.pageX, event.pageY) }
    document.addEventListener('mousemove', onMouseMove)
    dragItem.onmouseup = function(event) {
      dragItem.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY).closest('.droppable'); 
      dragItem.hidden = false;
      if ( !elemBelow ) return;
      if ( systemPrefix !== elemBelow.id ) moveItem(systemPrefix, elemBelow.id);
      onDrag(null)
      dragItem.remove()
      document.removeEventListener('mousemove', onMouseMove);
    }
  }
  
  const styleSystemDraged = `${styles.systemItem} ${styles.draged} droppable`;
  const styleSystem = `${styles.systemItem} droppable`
 
  return (
    <section className={styles.toolbar} id="toolbar">
      <div className={styles.window} id="toolWindow">
        <main className={styles.main}>
          <ul className={styles.systemItemList}>
            {prefers.systems.map(system => 
              <li key={system.system_prefix} id={system.system_prefix}
                className={system.system_prefix === drag ? styleSystemDraged : styleSystem}
                onMouseDown={(e) => onmousedown(e, system.system_prefix)}
              >
                <div className={`${styles.sysIcon} ${system.system_prefix.replace(/[0-9]/g, '')}`} 
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

