import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const getMainpageData = ( api_key ) => {
  // console.log('getMainpageData', api_key);
  return service.getResource(`${_apiBase}/?q=mainpage`, api_key)
};