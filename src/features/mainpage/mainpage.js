import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, dictionary, getMainpage, search } from "./mainpageSlice";
import { user } from '../user/userSlice';
import Section from "./section";
import LangButton from "./langButton";
// import SearchSystems from "./search";
import SearchList from "./searchList";
import ExpirationScreen from "../expirationScreen";
import bottomLeftImg from '../../assets/bottomleftbg2.png';
import bottomRightImg from '../../assets/bottomrightbg1.png';

import stemLogoRU from '../../assets/STEMRU.png';
import suekLogoRU from '../../assets/scec.svg';
import sgkLogoRU from '../../assets/sgc.svg';
import ntkLogoRU from '../../assets/ntc.svg';
import ehLogo from '../../assets/eh.svg';
import stemLogoEN from '../../assets/STEMEN.png';
import suekLogoEN from '../../assets/suek.svg';
import sgkLogoEN from '../../assets/sgk.png';
import ntkLogoEN from '../../assets/ntk.png';

export const Mainpage = () => {

  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const dictionaryData = useSelector(dictionary);
  const searchString = useSelector(search);
  const dispatch = useDispatch();
  useEffect(() => { 
    if ( userData.api_key ) dispatch(getMainpage(userData.api_key)) 
    setTimeout(() => onExpired(true), 12*60*60*1000)
  }, [dispatch, userData]);
  const [expired, onExpired] = useState(false);

  return (
    <section className={styles.mainpage}>
      <header>
        {userData['lang'] === 'RU'
          ? <>
              <img src={stemLogoRU} />
              <img src={suekLogoRU} />
              <img src={sgkLogoRU} />
              <img src={ntkLogoRU} />
              <img src={ehLogo} />
            </>
          : <>
              <img src={stemLogoEN} />
              <img src={suekLogoEN} />
              <img src={sgkLogoEN} />
              <img src={ntkLogoEN} />
              <img src={ehLogo} />
            </>
        }
      </header>
      
      <main>
        <LangButton/>
        <h1 className={styles.head_systemname}>{dictionaryData.head_systemname}</h1>
        {dictionaryData.head_currentuser && userData.ad_user
          ? <div className={styles.remoteUser}> {`${dictionaryData.head_currentuser}`} {`${userData.shortname} (${userData.ad_user})`}</div>
          : null
        }

        {/* <SearchSystems/> */}

        {searchString === "" 
          ? <ul className={styles.syetems}>
              { pageData.map(section => <Section key={section.id} section={section}/>) }
            </ul>
          : <SearchList/>  
        }       
      
      </main>
      
      <footer>
        <img src={bottomLeftImg} />
        <img src={bottomRightImg} />
      </footer>
 

      { expired ? <ExpirationScreen/> : null }
      
    </section>
  )
}
