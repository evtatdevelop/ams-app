import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const getRemoteUser = () => service.getResource(`${_apiBase}/?q=remoteuser`, null);
export const getUserData = ( data ) => service.getResource(`${_apiBase}/?q=user`, data);
export const setUserLang = ( data ) => service.updateResource(`${_apiBase}/?q=user`, data);
