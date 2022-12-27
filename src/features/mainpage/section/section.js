import React, { useState } from "react";
import styles from './section.module.scss';
import { System } from './system/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Section = props => {
  const { section } = props;
  const [show, onShow] = useState(section.prefix !== 'LK' ? true : false);

  return (
    <li className={styles.section} id={section.id}>

      <header>
        <label htmlFor={section.prefix}>
          {/* <h2 className={styles.name}>{section.name} ({Object.keys(section.systems).length})</h2> */}
          <h2 className={styles.name_sf}>{section.name} ({Object.keys(section.systems).length})</h2>
          <FontAwesomeIcon icon={ faCaretDown } className={show ? styles.iconButtonClose : styles.iconButton} />
        </label>
        
      </header>
      
      <input type="checkbox" 
        id={section.prefix}
        checked={show}
        onChange={()=>{
          if ( show ) document.getElementById(section.id).scrollIntoView('top');
          return onShow(!show)
        }}
      /> 
      <ul>
        {section.systems.map(system => {
          return !(section.prefix === 'LK' && +system.show !== 1)
          ? <System key={system.system_prefix} system={system}/>
          : null
        })}
      </ul>
    </li>
  )
}