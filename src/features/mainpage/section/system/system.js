import styles from './system.module.scss';

export const System = props => {
  const { system } = props;

  return (
    <li className={styles.system}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div>
          <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
          <div className={styles.request_name}>{system.request_name}</div>         
        </div>

        {system.cnt ? <div className={styles.cnt}>{system.cnt}</div> : null}
      
      </a>
      <nav className={styles.systemNav}>
        <button type='button'>1</button>
        <button type='button'>2</button>
      </nav>
    </li>
  )
}