import Service from "../../services";

const service = new Service();
const _apiBase = 'https://request.sibgenco.local/ams_api';

export const getMainpage = ( lang ) => service.getResource(`${_apiBase}/?q=mainpage&lang=${lang}`);
// export const getAsset = ( id ) => service.getResource(`${_apiBase}/?q=assets&id=${id}`);
// export const setAsset = ( data ) => service.updateResource(`${_apiBase}/?q=assets`, data);
// export const addAsset = ( data ) => service.postResource(`${_apiBase}/?q=assets`, data);
// export const delAsset = ( id ) => service.deleteResource(`${_apiBase}/?q=assets&id=${id}`);