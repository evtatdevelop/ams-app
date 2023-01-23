import React from "react";
import styles from './testPage.module.scss';
import Navigation from "../features/navigation";
import { getMainpageData } from "../features/mainpage/mainpageSliceAPI";
import { getRemoteUser, getUserData } from "../features/user/userSliceAPI";
import { TestItem } from "./testItem/testItem";

export const TestPage = () => {

  return (
    <section className={styles.testPage}>
      <header className={styles.header}>
        <h1>API Tests</h1>
      </header>
      <Navigation/>
      <main className={styles.tests}>

        <TestItem name='Remote User Data'
          request={getRemoteUser}
          data={{}} 
        />
        <TestItem name='Main Page Data'
          request={getMainpageData}
          data={{'api_key': 'TatarenkoEG'}}
        />
        <TestItem name='User Data by ID'
          request={getUserData}
          data={{'api_key': 'TatarenkoEG', 'app12_id': 1833}}
        />
        <TestItem name='User Data by Login'
          request={getUserData}
          data={{'api_key': 'TatarenkoEG', 'login': 'SUEKCORP\\tatarenkoeg'}}
        />

      </main>
    </section>
  )
}
