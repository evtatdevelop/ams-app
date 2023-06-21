import React from "react";
import styles from './sectionOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck, faArrowUpRightFromSquare, faQuestion } from '@fortawesome/free-solid-svg-icons'
// import { page } from "../../../../personalAreaSlice";
import { useSelector } from "react-redux";
import { filters } from "../../../../personalAreaSlice";
import { getFrontStatus } from "../../../../../../helpers";


export const SectionOrder = props => {
  const { order, hide } = props;
  // const pageMode = useSelector(page);
  const filtersData = useSelector(filters);

  const getIconStatus = () => {
    switch ( getFrontStatus(order.api_status) ) {
      case 'agreed': return <FontAwesomeIcon icon={ faCheck }/>
      case 'refused': return <FontAwesomeIcon icon={ faXmark }/>
      case 'inprogress': return <FontAwesomeIcon icon={ faArrowRight }/>
      default: return <FontAwesomeIcon icon={ faQuestion }/>  
    } 
  }
  const getStyleStatus = () => {
    switch ( getFrontStatus(order.api_status) ) {
      case 'agreed': return `${styles.agreed}`
      case 'refused': return `${styles.refused}`
      case 'inprogress': return `${styles.inprogress}`
      default: return `${styles.cuestion}`
    } 
  }

  const getShortName = longName => {
    const nameArr = longName.split(' ');
    return `${nameArr[0]} ${nameArr[1][0]}.${nameArr[2] ? `${nameArr[2][0]}.` : '' }`;
  }

  const onClic = () => window.open(`${order.urls.htm}${order.key}`, '_blank');
 
  const stylesSectionOrder = filtersData.searchNum && order.request_number.includes(filtersData.searchNum) ? `${styles.sectionOrder} ${styles.found}` : `${styles.sectionOrder}`

// console.log(filtersData.searchNum, order.request_number);

  return (
    <> { !hide
        ? <li className={stylesSectionOrder}>
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

             {/* { pageMode === 'myagree_arch'
                ? <div >{order.myagree_status} </div>
                : null   
             } */}

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
