import styles from './section.module.scss';
import { System } from './system/system';

export const Section = props => {
  const { section } = props;

  return (
    <li className={styles.section}>

      <h2 className={styles.name}>{section.name}</h2>
      <ul>
        {section.systems.map(system => {
          return <System key={system.system_prefix} system={system}/>
        })}
      </ul>
    </li>
  )
}