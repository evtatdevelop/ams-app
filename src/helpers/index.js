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
    .split(' ').forEach(word => {
      string += string.length + word.length > 47 ? "" : ` ${word}`
    })
  return ucFirst(string.trim(), false)
}