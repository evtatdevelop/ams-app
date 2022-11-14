import styles from './rowSection.module.scss';
import Section from '../section';

export const RowSection = props => {
  const { sections } = props;
  console.log(sections);
  return (
    <li className={styles.rowSection}>
      <ul>
        {sections.map(section => <Section key={section.id} section={section}/>)}
      </ul>
    </li>
  )
}