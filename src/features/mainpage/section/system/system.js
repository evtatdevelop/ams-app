import styles from './system.module.scss';

export const System = props => {
  const { system } = props;

  return (
    <li className={styles.system}>

      <h3>{system.request_name}</h3>

    </li>
  )
}