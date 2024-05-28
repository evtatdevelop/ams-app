import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getMyordersData        = ( api_key ) => service.getResource(`${apiBase}/?q=myorders`, api_key);
export const getMyagreeData         = ( api_key ) => service.getResource(`${apiBase}/?q=myagree`, api_key);
export const getMysettingsData      = ( api_key ) => service.getResource(`${apiBase}/?q=mysettings`, api_key);
export const getMysubstitutionData  = ( api_key ) => service.getResource(`${apiBase}/?q=mysubstitution`, api_key);
export const getMyarchiveData       = ( api_key ) => service.getResource(`${apiBase}/?q=myarchive`, api_key);
export const getMyexecData          = ( api_key ) => service.getResource(`${apiBase}/?q=myexec`, api_key);
export const getMyexecarchData      = ( api_key ) => service.getResource(`${apiBase}/?q=myexecarch`, api_key);