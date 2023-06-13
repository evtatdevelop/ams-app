import React from "react";
import styles from './sectionOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck, faArrowUpRightFromSquare, faQuestion } from '@fortawesome/free-solid-svg-icons'

export const SectionOrder = props => {
  const { order, hide } = props;

  const getIconStatus = () => {
    switch ( order.api_status ) {
      case 'agreed': case 'senttocpp': return <FontAwesomeIcon icon={ faCheck }/>
      case 'refused': case 'canceled': case 'timeout': case 'failed': return <FontAwesomeIcon icon={ faXmark }/>
      case 'inprogress': return <FontAwesomeIcon icon={ faArrowRight }/>
      case 'added': return <FontAwesomeIcon icon={ faQuestion }/>
      default: return null  
    } 
  }
  const getStyleStatus = () => {
    switch ( order.api_status ) {
      case 'agreed': case 'senttocpp': return `${styles.agreed}`
      case 'refused': case 'canceled': case 'timeout': case 'failed': return `${styles.refused}`
      case 'inprogress': return `${styles.inprogress}`
      case 'added': return `${styles.cuestion}`
      default: return `${styles.cuestion}`
    } 
  }

  const getShortName = longName => {
    const nameArr = longName.split(' ');
    return `${nameArr[0]} ${nameArr[1][0]}.${nameArr[2] ? `${nameArr[2][0]}.` : '' }`;
  }

  const onClic = () => window.open(`${order.urls.htm}${order.key}`, '_blank');

  return (
    <> { !hide
        ? <li className={styles.sectionOrder}>
            <button type="button" onClick={() => onClic()} className={styles.btnOpenOrder}>
              <p className={styles.orderName}>
                <span className={styles.requestNuber}>({order.request_number}) </span>
                {order.request_type} 
                {order.order_type === 'WORKPLACE' || order.order_type === 'CORPSYSTEMS'
                  ? <span className={styles.oredrUser}> [ <span className={styles.italic}>{getShortName(order.api_order_user.name)}</span> ]</span>
                  : null
                }
                <span> <FontAwesomeIcon icon={ faArrowUpRightFromSquare } className={`${styles.openOrder}`} /></span>
              </p>

             

              <div className={`${styles.orderStatus} ${getStyleStatus()}`}>
                <p className={styles.statusSign}>{getIconStatus()}</p>
                <p className={styles.statusHint}>{order.status}</p>
                </div>  
              
            </button>
          </li>
        : null
    }
    </>


  )
}
