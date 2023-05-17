import React from "react";
import styles from './section.module.scss';
import { System } from './system/system';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Section = props => {
  const { section } = props;

  return (
    <li className={styles.section} id={section.id}>
      <h2 className={styles.sectionName}>{section.name}</h2>

      <ul className={styles.systemList}>
        {section.systems.map((system, index) => <System key={system.system_prefix} system={system} prefix={section.prefix} index={index}/>)}
      </ul>
    </li>
  )
}