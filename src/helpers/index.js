export const ucFirst = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export const normalizeSystemName = (str) => {
  return ucFirst(str
    .replace('Заявка на ', '')
    .replace('Запрос на ', '')
    .replace('Request for ', '')
    .replace('организацию', 'организация')
    .replace('командировку', 'командировка')
  ).slice(0,45);
}