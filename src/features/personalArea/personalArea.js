import React from "react";
import styles from './personalArea.module.scss';
import { useSelector } from "react-redux";
import Sidebar from "../sidebar";
import LangButton from "../primaryPage/langButton";
import { permitted } from '../../config';
import { user } from '../user/userSlice';
import Navigation from "../navigation";
import { useParams } from "react-router-dom";


export const PersonalArea = () => {
  const userData = useSelector(user);

  let params = useParams();
  // console.log(params.page); 

  return (
    <section className={styles.personalArea}>
      <Sidebar page = 'personalAria'/>
      <main className={styles.main}>
        
        <header className={styles.mainHeader}>
          <h1 className={styles.pageName}>Personal Aria Test Page</h1>
          <div className={styles.mobwraper}>
            <LangButton/>            
          </div>
        </header>

        <h1>{params.page}</h1>

      </main>
      { permitted.includes(userData.login) ? <Navigation page = 'mainpage'/> : null }
    </section>
  )
}
