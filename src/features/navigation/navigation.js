import React from "react";
import styles from './navigation.module.scss';
import { Link } from 'react-router-dom';
import { mainpage, developer, pathBase} from '../../config';
import { user } from '../user/userSlice';
import { useSelector } from "react-redux";

export const Navigation = props => {
  const { page } = props;
  const userData = useSelector(user);

  return (
    <div className={styles.navigation}>
      <button type="button" className={styles.btnDevNav}>Dev Navigation</button>
      <nav className={styles.devNav}>
        <p className={styles.headDevNav}>Dev Navigation</p>
        <ul>
          <li>        
            { page === 'mainpage'
              ? mainpage.includes(userData.login) 
                ? <Link to = {`${pathBase}/primarypage`}>PrimaryPage</Link>
                : <Link to = {`${pathBase}/`}>PrimaryPage</Link>
              : mainpage.includes(userData.login) 
                ? <Link to = {`${pathBase}/`}>FreakPage</Link>
                : <Link to = {`${pathBase}/mainpage`}>FreakPage</Link>
            }
          </li>

          {developer.includes(userData.login) 
            ? <>
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
