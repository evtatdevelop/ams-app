import Service from "../../services";
import { testMode, offline, offlinelang } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

// export const getMainpageData = ( api_key ) => service.getResource(`${_apiBase}/?q=mainpage`, api_key);
export const getMainpageData = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mainpage`, api_key) : service.getResource(`http://localhost:3000/mainpageen`, api_key)
  : service.getResource(`${_apiBase}/?q=mainpage`, api_key);

export const addPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=addprefers`, data);
export const delPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=delprefers`, data);