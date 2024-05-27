import React from "react";
import styles from './navigation.module.scss';
import { Link } from 'react-router-dom';
import { mainpage, developer, mode, root} from '../../config';
import { user } from '../user/userSlice';
import { useSelector } from "react-redux";

// import { testMode, root } from "../../config";

export const Navigation = props => {
  const { page } = props;
  const userData = useSelector(user);
  // const _pathBase = testMode ? '' : `/${root}`
  const _pathBase = mode === 'local' ? '' : `/${root}`

  return (
    <div className={styles.navigation}>
      <button type="button" className={styles.btnDevNav}>Dev Navigation</button>
      <nav className={styles.devNav}>
        <p className={styles.headDevNav}>Dev Navigation</p>
        <ul>
          <li>        
            { page === 'mainpage'
              ? mainpage.includes(userData.login) 
                ? <Link to = {`${_pathBase}/primarypage`}>PrimaryPage</Link>
                : <Link to = {`${_pathBase}/`}>PrimaryPage</Link>
              : mainpage.includes(userData.login) 
                ? <Link to = {`${_pathBase}/`}>FreakPage</Link>
                : <Link to = {`${_pathBase}/mainpage`}>FreakPage</Link>
            }
          </li>

          {developer.includes(userData.login) 
            ? <>
                {/* <li><Link to = '/personalArea'>PersonalArea</Link></li> */}
                <li><Link to = '/workplace'>Workplace</Link></li>
                <li><Link to = '/resources'>Resources</Link></li> 
                <li><Link to = '/apiTests'>API Tests</Link></li>           
              </>
            : null
          }

          <li> <Link to = '/components'>Components</Link></li>
        </ul>

        
        
        
       
        
      </nav>      
    </div>

  )
}
