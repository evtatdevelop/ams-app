import styles from './system.module.scss';

export const System = props => {
  const { system } = props;

  return (
    <li className={styles.system}>
      <div>
        <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>
        <a href={`${system.request_url}`}>
          {system.request_name}
          {system.cnt ? ` (${system.cnt})` : null}
        </a>       
      </div>
     {system.add_systems_info 
      ? <p>{system.add_systems_info}</p>
      : null
    }
    </li>
  )
}