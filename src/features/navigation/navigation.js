import React from "react";
import styles from './navigation.module.scss';
import { Link } from 'react-router-dom';
import { mainpage} from '../../config';
import { user } from '../user/userSlice';
import { useSelector } from "react-redux";

// import { testMode, root } from "../../config";

export const Navigation = () => {
  const userData = useSelector(user);

  return (
    <nav className={styles.navigation}>
      {mainpage.includes(userData.login) 
        ? <Link to = {`/`}>PrimaryPage</Link>
        : <Link to = {`/primarypage`}>PrimaryPage</Link>
      }
      {/* <Link to = '/personalArea'>PersonalArea</Link> */}
      {/* <Link to = '/workplace'>Workplace</Link> */}
      <Link to = '/resources'>Resources</Link>
      <Link to = '/components'>Components</Link>
      <Link to = '/apiTests'>API Tests</Link>
    </nav>
  )
}
