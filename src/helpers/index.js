// export const moneyFormat = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// export const getTime = ( timeStamp ) => {
//   const time = new Date(timeStamp)
//   let h = time.getHours()
//   let m = time.getMinutes()
//   h = h > 9 ? h : `0${h}`
//   m = m > 9 ? m : `0${m}`
//   return `${h}:${m}`
// }

// export const getDate = ( timeStamp ) => {
//   const time = new Date(timeStamp)
//   let m = time.getMonth() + 1
//   let d = time.getDate()
//   m = m > 9 ? m : `0${m}`
//   d = d > 9 ? d : `0${d}`
//   return `${time.getFullYear()}-${m}-${d}`
// }

// export const getPeriod = ( now, period ) => {
//   const dateNow = new Date(now);
//   const day = 24*60*60*1000;
//   switch ( period ) {
//     case 'day':   return day;
//     case 'week':  return 7 * day;
//     case 'month': return new Date(dateNow.getFullYear(), dateNow.getMonth()+1, 0).getDate() * day;
//     case 'year':  return (new Date(dateNow.getFullYear(),11,31) - new Date(dateNow.getFullYear(),0,0));
//     default:      return 0  
//   }
// }

export const ucFirst = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}