import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpageData, addPrefers, delPrefers  } from './mainpageSliceAPI';
import { normalizeSystemName } from "../../helpers";

const initialState = {
  loading: false,
  loadingAdd: false, 
  data: [],
  dictionary: [],
  search: '',
  filtred: [],
  contextMenu: {},
  notification: '',
  fastaccess: null,
  fastshow: false,
  orderPrefers: [],
  toolbarShow: false,
  buisySystems: [],
}

export const getMainpage = createAsyncThunk( 'primarypage/getMainpage', async (api_key) => await getMainpageData({'api_key': api_key}) )

export const addToPrefers = createAsyncThunk( 'primarypage/addToPrefers', async ( data ) => await addPrefers(data) )
export const delToPrefers = createAsyncThunk( 'primarypage/delToPrefers', async ( data ) => await delPrefers(data) )

export const primarypageSlice = createSlice({
  name: 'primarypage',
  initialState,
  reducers: {
    onSearch: (state, action) => { 
      state.search = action.payload 
      state.filtred = []
      state.data.map(section => 
        section.prefix !== 'TOP_ORDERS' && section.prefix !== 'FAVORITES' && section.prefix !== 'LK'
        ? section.systems.map(system => 
          (system.request_name.toUpperCase().includes(state.search.toUpperCase())
            || (system.synonyms && system.synonyms.toUpperCase().includes(state.search.toUpperCase()))
          ) && state.search !== ""
            ? state.filtred.includes(system) ? null : state.filtred.push(system)
            : null
          )
        : false  
      )
    },

    runBuisySystems: (state, action) => {
      state.buisySystems = state.buisySystems.includes(action.payload)  
      ? state.buisySystems.filter(item => item !== action.payload)
      : [...state.buisySystems, action.payload]
    }, 

    onToolbar: (state, action) => {
      state.toolbarShow = action.payload
    }, 

    setOrderPrefers: (state, action) => {
      state.orderPrefers = [...action.payload]
    },

    clearSearch: (state) => { 
      state.search = '' 
      state.filtred = []
      state.fastaccess = null
    },

    onFastShow: (state, action) => {
      state.fastshow = action.payload
    },

    onContextMenu: (state, action) => {
      state.contextMenu = action.payload
      state.fastshow = false
    },
    
    offContextMenu: (state) => {
      state.contextMenu = {}
    },

    onNotification: (state, action) => {
      state.notification = action.payload
    },
    
    offNotification: (state) => {
      state.notification = ""
    },

    onFastAccess: (state, action) => {
      state.fastaccess = action.payload
    },

    stopLoadingAdd: (state) => {
      state.loadingAdd = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMainpage.pending, ( state ) => { state.loading = true })
      .addCase(getMainpage.fulfilled, ( state, action ) => {
        state.data = SystemRun(action.payload.sections);
        state.dictionary = action.payload.dictionary;
        state.orderPrefers = state.orderPrefers.length === 0 ? mkPrefersData(action.payload.sections) : state.orderPrefers
        state.loading = false;
      })

      .addCase(addToPrefers.pending, ( state ) => { state.loadingAdd = true })
      .addCase(addToPrefers.fulfilled, ( state, action ) => {
        state.data = SystemRun(action.payload.sections);
        state.dictionary = action.payload.dictionary;
        state.loadingAdd = false;
      })

      .addCase(delToPrefers.pending, ( state ) => { state.loadingAdd = true })
      .addCase(delToPrefers.fulfilled, ( state, action ) => {
        state.data = SystemRun(action.payload.sections);
        state.dictionary = action.payload.dictionary;
        state.loadingAdd = false;
      })
  }
});

export const { 
  onSearch, clearSearch, onContextMenu, offContextMenu, onNotification, offNotification, 
  onFastAccess, onFastShow, setOrderPrefers, onToolbar, runBuisySystems, stopLoadingAdd
} = primarypageSlice.actions;

export const mainpage     = ( state ) => state.primarypage.data;
export const dictionary   = ( state ) => state.primarypage.dictionary;
export const loading      = ( state ) => state.primarypage.loading;
export const search       = ( state ) => state.primarypage.search;
export const filtred      = ( state ) => state.primarypage.filtred;
export const contextMenu  = ( state ) => state.primarypage.contextMenu;
export const notification = ( state ) => state.primarypage.notification;
export const fastaccess   = ( state ) => state.primarypage.fastaccess;
export const fastshow     = ( state ) => state.primarypage.fastshow;
export const orderPrefers = ( state ) => state.primarypage.orderPrefers;
export const toolbarShow  = ( state ) => state.primarypage.toolbarShow;
export const loadingAdd   = ( state ) => state.primarypage.loadingAdd;
export const buisySystems = ( state ) => state.primarypage.buisySystems;

export default primarypageSlice.reducer;

const SystemRun = data => {
  return data.map(section => {
    return {...section, systems: section.systems.map(system => {
      return {...system, 
        request_name: section.prefix === 'LK' ? system.request_name : normalizeSystemName(system.request_name),
        picked: checkPicked(data, system.system_prefix)
      }
    })}
  });
}

const checkPicked = (data, systemPrefix) => {
  let result = false
  data.map(section => {
    if ( section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES' )
      if ( section.systems.find(system => system.system_prefix === systemPrefix) ) result = true
    return null   
  })
  return result
}

export const mkPrefersData = (pageData) => {
  const setPrefers = new Set();
  pageData.map(section => 
    section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES' 
    ?  section.systems.map(sytem => {
        setPrefers.add(sytem.system_prefix)
        return null
      })
    : null
  )
  return [...setPrefers]
}