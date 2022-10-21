import Service from "../../services";

const service = new Service();
const _apiBase = 'https://request.sibgenco.local/ams_api';

export const getUserData = ( lang ) => service.getResource(`${_apiBase}/?q=mainpage&lang=${'ru'}`);
