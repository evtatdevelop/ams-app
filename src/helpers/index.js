export const ucFirst = (str, onlyFirst = true) => {
  if (!str) return str;
  return onlyFirst 
    ? str[0].toUpperCase() + str.slice(1).toLowerCase()
    : str[0].toUpperCase() + str.slice(1);
}

export const normalizeSystemName = (str) => {
  let string = '';
  str.replace('Заявка на ', '')
    .replace('Запрос на ', '')
    .replace('Request for ', '')
    .replace('организацию', 'организация')
    .replace('командировку', 'командировка')
    .replace(' / предоставление полномочий', '')
    .replace('/перевыпуск', '')
    .split(' ').forEach(word => {
      string += string.length + word.length > 47 ? "" : ` ${word}`
    })
  return ucFirst(string.trim(), false)
}

export const lsGet = ( lskey, dataInit ) => {
  const lsdata = localStorage.getItem(lskey)
  if ( lsdata ) return JSON.parse(lsdata)
  localStorage.setItem(lskey, JSON.stringify(dataInit))
  return dataInit
}

export const getDate = ( timeStamp ) => {
  const time = new Date(+timeStamp)
  // const Y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  const wd = time.toLocaleString('en', { weekday: 'short' })
  m = m > 9 ? m : `0${m}`
  d = d > 9 ? d : `0${d}`
  return `(${wd}) ${d}`
}

export const getFrontStatus = ( order_api_status ) => {
  switch ( order_api_status ) {
    case 'agreed': case 'senttocpp': return 'agreed'
    case 'refused': case 'canceled': case 'timeout': case 'failed': case 'added': return 'refused'
    case 'inprogress': return 'inprogress'
    default: return null  
  } 
}