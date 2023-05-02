import React from "react";
import styles from './navigation.module.scss';
import { Link } from 'react-router-dom';

// import { testMode, root } from "../../config";

export const Navigation = () => {
  // const _pathBase = testMode ? '' : `/${root}`;

  return (
    <nav className={styles.navigation}>
      <Link to = {`/primarypage`}>Mainpage</Link>
      <Link to = '/personalArea'>PersonalArea</Link>
      <Link to = '/workplace'>Workplace</Link>
      <Link to = '/resources'>Resources</Link>
      <Link to = '/components'>Components</Link>
      <Link to = '/apiTests'>API Tests</Link>
    </nav>
  )
}
