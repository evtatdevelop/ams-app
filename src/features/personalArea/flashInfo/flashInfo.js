import React, {useRef, useEffect, useState} from "react";
import styles from './flashInfo.module.scss';
import { useSelector } from "react-redux";
// import { user } from '../user/userSlice';
// import dictionary from '../../dictionary.json';
import { orderInfo } from "../personalAreaSlice";

export const FlasInfo = () => {
  // const userData = useSelector(user);
  const { showOI, leftOI, topOI, bottomOI, dataOI } = useSelector(orderInfo);
  
  const ref = useRef(null)
  const [h, seth] = useState(0)
  const [w, setw] = useState(0)

  useEffect(()=> {
    if ( showOI ) {
      seth(ref.current ? ref.current.clientHeight : 0)
      setw(ref.current ? ref.current.clientWidth : 0)
    }
  },[showOI])

  const X = document.documentElement.clientWidth < leftOI + w ? `${document.documentElement.clientWidth - w}px` : `${leftOI}px`;
  const Y = document.documentElement.clientHeight < bottomOI + h + 3 ? `${topOI-h}px` : `${bottomOI}px`;
  const W = document.documentElement.clientWidth < leftOI + w && document.documentElement.clientWidth - w < 0 ? `100vw` : `auto`;

  const styleOrderInfo = showOI ? `${styles.orderInfo} ${styles.show}` : `${styles.orderInfo}`

  return (
    showOI
      ? <div className={styleOrderInfo} style={{left: X, top: Y, width: W }} ref={ref}>
        {/* { dataOI.order_type === 'WORKPLACE' */}
        { true
          ? <ul className={styles.orderInfoList}>
              {dataOI.status ? <li><span className={styles.label}>Статус запроса:</span> <span className={styles[dataOI.status_color]}>{dataOI.status}</span></li> : null}
              {dataOI.date_open ? <li><span className={styles.label}>Дата подачи:</span> {dataOI.date_open}</li> : null}
              { dataOI.api_order_user
                ? <>
                    { dataOI.api_order_user.placement ? <li><span className={styles.label}>Тип трудоустройства:</span> {dataOI.api_order_user.placement}</li> : null}
                    { dataOI.api_order_user.name 
                      ? <li>
                          <span className={styles.label}>Cотрудник:</span> {dataOI.api_order_user.name}
                          <p>
                            { dataOI.api_order_user.branch || dataOI.api_order_user.position || dataOI.api_order_user.division
                              ? `${dataOI.api_order_user.branch ? dataOI.api_order_user.branch : ''} ${dataOI.api_order_user.position ? dataOI.api_order_user.position : ''} ${dataOI.api_order_user.division ? dataOI.api_order_user.division : ''}`
                              : null
                            } 
                          </p>
                          <p> 
                            {dataOI.api_order_user.outer_company_name ? dataOI.api_order_user.outer_company_name : null} 
                          </p>
                        </li> 
                      : null
                    }

                    
                    

                  </>
                : null
              }

              { dataOI.order_type === 'FSR'
                ? <>{ dataOI.api_privs
                    ? <li>
                        {dataOI.api_privs.type_act === 'NEW' ? 'Создание' : 'Изменение'} {dataOI.api_privs.type_code === 'FILE' ? 'файлового ресурса' : 'серверного ресурса'}
                        { dataOI.api_privs.path 
                          ? <p>{dataOI.api_privs.path}</p>
                          : null
                        }
                      </li>
                    : null
                  }</>
                : null
              }

              { dataOI.order_type === 'CORPSYSTEMS'
                ? <>{ dataOI.api_privs
                    ? <li>
                        <span className={styles.label}>Запрошено:</span>
                        { dataOI.api_privs.map((priv, index) => <div key={index} style={{marginBottom: '8px'}}>
                            <p>{`${index+1}. ${priv.asz00_name} /${priv.asz02_name} /${priv.asz03_name} (${priv.role_cod})`}</p>
                            {priv.levels.map(level => <p>
                              <span className={styles.label} style={{marginLeft: '14px'}}>{level.asz05_name}</span>
                              {level.values.map(val => ` ${val}`)}
                            </p>)}
                          </div>
                        )}
                      </li>
                    : null
                  }</>
                : null
              }
              
            </ul>         

          : null

        }

        
        </div>
      : null
  )     
}
