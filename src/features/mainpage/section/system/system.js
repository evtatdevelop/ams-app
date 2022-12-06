import styles from './system.module.scss';

export const System = props => {
  const { system } = props;

  return (
    <li className={styles.system}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
        <div className={styles.request_name}>
          {system.request_name}
          {system.cnt ? <> ({system.cnt})</> : null}
        </div>         

        
      
      </a>
    </li>
  )
}