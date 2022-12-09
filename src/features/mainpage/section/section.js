import React, { useState } from "react";
import styles from './section.module.scss';
import { System } from './system/system';

export const Section = props => {
  const { section } = props;
  const [show, onShow] = useState(section.prefix !== 'LK' ? true : false);
  
  return (
    <li className={styles.section}>

      <header>
        <h2 className={styles.name}>{section.name} ({Object.keys(section.systems).length})</h2>
        <label htmlFor={section.prefix}>+</label>
      </header>
      
      <input type="checkbox" 
        id={section.prefix}
        checked={show}
        onChange={()=>onShow(!show)}
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