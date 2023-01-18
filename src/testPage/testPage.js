import React, { useState } from "react";
import styles from './testPage.module.scss';
import Navigation from "../features/navigation";
import { getMainpageData } from "../features/mainpage/mainpageSliceAPI";
import { getRemoteUser } from "../features/user/userSliceAPI";
import { TestLoader } from "./testLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const TestPage = () => {
  
  const [remoteUser, remoteUserTest] = useState(false)
  const [mainpageData, mainpageDataTest] = useState(false)

  getRemoteUser().then(value => remoteUserTest(true))
  getMainpageData('TatarenkoEG').then(value => mainpageDataTest(true))

  return (
    <section className={styles.testPage}>
      <header className={styles.header}>
        <h1>API Tests</h1>
      </header>
      <Navigation/>

      <main className={styles.tests}>

        <div className={styles.testRow}>
          <div className={styles.testName}>Remote User Data</div>
          <div className={styles.testRes}>{ remoteUser ? <FontAwesomeIcon icon={faCheck} /> : <TestLoader/> }</div>
        </div>

        <div className={styles.testRow}>
          <div className={styles.testName}>Main Page Data</div>
          <div className={styles.testRes}>{ mainpageData ? <FontAwesomeIcon icon={faCheck} /> : <TestLoader/> }</div>       
        </div>

      </main>

    </section>
  )
}
