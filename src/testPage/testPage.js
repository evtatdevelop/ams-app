import React, { useState } from "react";
import styles from './testPage.module.scss';
import Navigation from "../features/navigation";
import { getMainpageData } from "../features/mainpage/mainpageSliceAPI";
import { getRemoteUser, getUserData } from "../features/user/userSliceAPI";
import { TestLoader } from "./testLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const TestPage = () => {
  const [remoteUser, remoteUserTest] = useState(false)
  const [mainpageData, mainpageDataTest] = useState(false)
  const [userDataId, userDataIdTest] = useState(false)
  const [userDataLogin, userDataLoginTest] = useState(false)

  getRemoteUser({}).then(value => remoteUserTest(true))
  getMainpageData({'api_key': 'TatarenkoEG'}).then(value => mainpageDataTest(true))
  getUserData({'api_key': 'TatarenkoEG', 'app12_id': 1833}).then(value => userDataIdTest(true))
  getUserData({'api_key': 'TatarenkoEG', 'login': 'SUEKCORP\\tatarenkoeg'}).then(value => userDataLoginTest(true))

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

        <div className={styles.testRow}>
          <div className={styles.testName}>User Data by ID</div>
          <div className={styles.testRes}>{ userDataId ? <FontAwesomeIcon icon={faCheck} /> : <TestLoader/> }</div>       
        </div>

        <div className={styles.testRow}>
          <div className={styles.testName}>User Data by Login</div>
          <div className={styles.testRes}>{ userDataLogin ? <FontAwesomeIcon icon={faCheck} /> : <TestLoader/> }</div>       
        </div>

      </main>
    </section>
  )
}
