import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const System = props => {
  const { system, prefix, index } = props;
  const zIndex = 999-index;

  return (
    <li className={styles.system} style={{zIndex: `${zIndex}`}}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div>
          <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
          <div className={styles.request_name}>{system.request_name}</div>         
        </div>

        {system.cnt ? <div className={styles.cnt}>{system.cnt}</div> : null}
      
      </a>
      {prefix !== 'LK'
       ? <nav className={styles.systemNav}>
          <div>
            <button type='button'>
              <FontAwesomeIcon icon={ faQuestion } className={styles.iconButton} />
            </button>
            <div className={styles.hint}>Question</div>          
          </div>
          <div>
            <button type='button'>
              <FontAwesomeIcon icon={ faPlus } className={styles.iconButton} />
            </button>
            <div className={styles.hint}>Plus</div>          
          </div>
        </nav>
       : null       
      }

    </li>
  )
}