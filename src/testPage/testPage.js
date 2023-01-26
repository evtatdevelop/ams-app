import React from "react";
import styles from './testPage.module.scss';
import Navigation from "../features/navigation";
import { getMainpageData } from "../features/mainpage/mainpageSliceAPI";
import { getRemoteUser, getUserData, setUserLang, searchUsers } from "../features/user/userSliceAPI";
import { TestItem } from "./testItem/testItem";

export const TestPage = () => {

  return (
    <section className={styles.testPage}>
      <header className={styles.header}>
        <h1>API Tests</h1>
      </header>
      <Navigation/>
      <main className={styles.tests}>

        {/* <TestItem name='Remote User Data'
          request={getRemoteUser}
          data={{}} 
        />
        <TestItem name='Main Page Data'
          request={getMainpageData}
          data={{'api_key': 'TatarenkoEG'}}
        />
        <TestItem name='User Data by ID'
          request={getUserData}
          data={{'api_key': 'TatarenkoEG', 'app12_id': 36323}}
        />
        <TestItem name='User Data by Login'
          request={getUserData}
          data={{'api_key': 'TatarenkoEG', 'login': 'SUEKCORP\\martynenkoaa'}}
        />
        <TestItem name='Switching User Lang'
          request={setUserLang}
          data={{'app12_id': 1833, 'lang': 'RU', 'api_key': 'TatarenkoEG'}}
        /> */}
        <TestItem name='User search'
          request={searchUsers}
          // data={{'string': 'тат', 'api_key': 'TatarenkoEG'}}
          data={{'string': 'тат', 'author_id': 1833, 'api_key': 'TatarenkoEG'}}
        />

      </main>
    </section>
  )
}
