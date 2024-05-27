import Service from "../../services";
import { mode, offline, offlinelang } from "../../config";

const service = new Service();

// const currentUrl = window.location.href.split('/')[2];
// console.log( window.location.href.split('/')[2] );
// console.log( window.location );

let _apiBase;
// const _apiBase = testMode 
// ? 'https://request.sibgenco.local/ams_api_tst'
// // : `https://${currentUrl}/ams_api`;
// : `https://${window.location.hostname}/ams_api`;

switch ( mode ) {
  // case 'test': _apiBase ='https://request.sibgenco.local/ams_api_tst'; break;
  case 'test': _apiBase ='https://asuz.digtp.com/ams_api_tst'; break;
  case 'prod': _apiBase = `https://${window.location.hostname}/ams_api`; break;
  // default: _apiBase ='https://request.sibgenco.local/ams_api_tst'
  default: _apiBase ='https://asuz.digtp.com/ams_api_tst'
}

// export const getRemoteUser = ( data ) => service.getResource(`${_apiBase}/?q=remoteuser`, data);
export const getRemoteUser = ( data ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/remoteuser`, data) : service.getResource(`http://localhost:3000/remoteuseren`, data)
  : service.getResource(`${_apiBase}/?q=remoteuser`, data);

export const setUserLang = ( data ) => service.updateResource(`${_apiBase}/?q=user`, data);
export const getUserData = ( data ) => {
  const mode = data.app12_id ? `&app12_id=${data.app12_id}` : `&login=${data.login}`;
  return service.getResource(`${_apiBase}/?q=user${mode}`, data)
}
export const searchUsers = ( data ) => {
  const string = data.string ? data.string : '';
  const author_id = data.author_id ? data.author_id : '';
  return service.getResource(`${_apiBase}/?q=users&string=${string}&author_id=${author_id}`, data)
}