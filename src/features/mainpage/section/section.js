import React, { useState } from "react";
import styles from './section.module.scss';
import { System } from './system/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Section = props => {
  const { section } = props;
 
  const sectionHide = localStorage[section.prefix] 
    ? localStorage[section.prefix] === 'true' ? true : false
    : section.prefix === 'TOP_ORDERS' ? false : true

  const [hide, onHide] = useState(sectionHide);
  localStorage[section.prefix] = sectionHide;

  const showHide = () => {
    if ( hide ) document.getElementById(section.id).scrollIntoView('top');
    onHide(!hide)
    localStorage[section.prefix] = !hide;
  }

  return (
    <li className={styles.section} id={section.id}>

      <header>
        <label htmlFor={section.prefix}>
          <h2 className={styles.name_sf}>{section.name} ({Object.keys(section.systems).length})</h2>
          <FontAwesomeIcon icon={ faCaretDown } className={hide ? styles.iconButtonClose : styles.iconButton} />
        </label>
        
      </header>
      
      <input type="checkbox" 
        id={section.prefix}
        checked={hide}
        onChange={()=>showHide()}
        // onChange={()=>{
        //   if ( hide ) document.getElementById(section.id).scrollIntoView('top');
        //   return onHide(!hide)
        // }}
      /> 
      <ul className={styles.sectionList}>
        {section.systems.map((system, index) => {
          return !(section.prefix === 'LK' && +system.show !== 1)
          ? <System key={system.system_prefix} system={system} prefix={section.prefix} index={index}/>
          : null
        })}
      </ul>
    </li>
  )
}