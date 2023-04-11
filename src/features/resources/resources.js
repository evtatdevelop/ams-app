import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './resources.module.scss';
import Navigation from "../navigation";

import {setPhone, getServers, setReruestType, phone, servers, requestType, loading } from "./resourcesSlice";

import Loader from "./loader";

import InfoField from "../components/infoField";
import Input from "../components/input";
import Fieldset from "../components/fieldset";
import Select from "../components/select";

import { user } from '../user/userSlice';


export const Resources = () => {

  const userData = useSelector(user);
  const appPhone = useSelector(phone);


  const dispatch = useDispatch();
  useEffect(() => { 
    // if ( userData.api_key ) dispatch(getServers(userData.api_key)) 
    if ( userData.phone1 ) dispatch(setPhone(userData.phone1)) 
  }, [dispatch, userData]); 

  return (
    
    <section className={styles.resources}>
        <header className={styles.header}>
          <h1>Resources</h1>
        </header>
        <Navigation/>

        { userData.given_name 
          ? <form className={styles.orderForm}>
              <Fieldset legend = "Инициатор запроса">
                <div className={styles.fieldrow}>
                  <label className={styles.rowLabel}>Ф.И.О. инициатора</label>
                  <InfoField 
                    placeholder = "Applicant"
                    val={userData.given_name}
                    readonly = {true}
                  />
                </div>
                <div className={styles.fieldrow}>
                  <label className={styles.rowLabel}>Телефон</label>
                  <Input
                    inputHandler = { val => dispatch(setPhone(val)) }
                    inputClear = { val => dispatch(setPhone('')) }
                    placeholder = 'Phone'
                    val = {userData.phone1}
                  />
                </div>
                <div className={styles.fieldrow}>
                  <label className={styles.rowLabel}>&nbsp;</label>
                  <div className={styles.addTest}>
                    Инициатор запроса - это сотрудник, от лица которого будет сформирована заявка в Центр поддержки пользователей.
                    Также инициатору будут отправляться уведомления о состоянии запроса, с ним могут связаться при возникновении каких-либо вопросов для уточнения.
                  </div>
                </div>            
              </Fieldset>

              <Fieldset legend = "Тип запроса">
                <div className={styles.fieldrow}>
                  <label className={styles.rowLabel}>Тип запроса</label>
                  <Select
                    selectHandler = { val => dispatch(setReruestType(val))  }
                    selectClear = { val => dispatch(setReruestType(val)) }
                    placeholder = 'Тип запроса'
                    selectList = {[
                      {'id': 'file', 'name': 'Запрос на создание.расширение файлового ресурса'}, 
                      {'id': 'server', 'name': 'Запрос на создание.расширение серверного ресурса'}, 
                    ]}
                    val = ''
                    name='RequestType'
                  />            
                </div>
              </Fieldset>

              <Fieldset legend = "Требования к файловому ресурсу">
              </Fieldset>

            </form>
          : <Loader/>
        }

      </section>
      


  )
}
