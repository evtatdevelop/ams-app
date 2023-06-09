import React from "react";
import styles from './sectionOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export const SectionOrder = props => {
  const { order, hide } = props;

  const getIconStatus = () => {
    switch ( order.api_status ) {
      case 'agreed': case 'senttocpp':
        return <FontAwesomeIcon icon={ faCheck } className={`${styles.agreed}`} />
      case 'refused': case 'canceled': case 'timeout': case 'failed':
        return <FontAwesomeIcon icon={ faXmark } className={`${styles.refused}`} />
      case 'added': case 'inprogress':
        return <FontAwesomeIcon icon={ faArrowRight } className={`${styles.inprogress}`} />
      default: return null  
    } 
  }

  const getShortName = longName => {
    const nameArr = longName.split(' ');
    return `${nameArr[0]} ${nameArr[1][0]}.${nameArr[2] ? `${nameArr[2][0]}.` : '' }`;
  }

  return (
    <> { !hide
        ? <li className={styles.sectionOrder}>
            <button type="button" className={styles.btnOpenOrder}>
              <p className={styles.orderName}>
                <span className={styles.requestNuber}>({order.request_number}) </span>
                {order.request_type} 
                {order.order_type === 'WORKPLACE' || order.order_type === 'CORPSYSTEMS'
                  ? <span className={styles.oredrUser}> [ <span className={styles.italic}>{getShortName(order.api_order_user.name)}</span> ]</span>
                  : null
                }
                
              </p>
              <p className={styles.orderStatus}>{getIconStatus()}</p>
              <FontAwesomeIcon icon={ faArrowUpRightFromSquare } className={`${styles.openOrder}`} />
            </button>
          </li>
        : null
    }
    </>


  )
}
