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

        {/* {system.add_systems_info ? <div>{system.add_systems_info}</div> : null} */}
      
      </a>
    </li>
  )
}