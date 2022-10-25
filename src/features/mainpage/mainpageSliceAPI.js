import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const getMainpageData = ( lang ) => service.getResource(`${_apiBase}/?q=mainpage&lang=${lang}`);
// export const getAsset = ( id ) => service.getResource(`${_apiBase}/?q=assets&id=${id}`);
// export const setAsset = ( data ) => service.updateResource(`${_apiBase}/?q=assets`, data);
// export const addAsset = ( data ) => service.postResource(`${_apiBase}/?q=assets`, data);
// export const delAsset = ( id ) => service.deleteResource(`${_apiBase}/?q=assets&id=${id}`);