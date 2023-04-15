import React, { useState } from "react";
import styles from './section.module.scss';
import { System } from './system/system';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Section = props => {
  const { section } = props;

  return (
    <li className={styles.section} id={section.id}>

      <header>
        <label htmlFor={section.prefix}>
          <h2 className={styles.name_sf}>{section.name} ({Object.keys(section.systems).length})</h2>
      </label>
        
      </header>

      <ul className={styles.systemList}>
        {section.systems.map((system, index) => <System key={system.system_prefix} system={system} prefix={section.prefix} index={index}/>)}
      </ul>
    </li>
  )
}