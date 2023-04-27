import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpageData, addPrefers, delPrefers  } from './mainpageSliceAPI';

const initialState = {
  loading: false,
  data: [],
  dictionary: [],
  search: '',
  filtred: [],
  contextMenu: {},
  notification: '',
  fastaccess: null,
  fastshow: false,
}

export const getMainpage = createAsyncThunk( 'primarypage/getMainpage', async (api_key) => await getMainpageData({'api_key': api_key}) )

export const addToPrefers = createAsyncThunk( 'mainpage/addToPrefers', async ( data ) => await addPrefers(data) )
export const delToPrefers = createAsyncThunk( 'mainpage/delToPrefers', async ( data ) => await delPrefers(data) )

export const primarypageSlice = createSlice({
  name: 'primarypage',
  initialState,
  reducers: {
    onSearch: (state, action) => { 
      state.search = action.payload 
      state.filtred = []
      state.data.map(section => 
        section.prefix !== 'TOP_ORDERS' && section.prefix !== 'FAVORITES'
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMainpage.pending, ( state ) => { state.loading = true })
      .addCase(getMainpage.fulfilled, ( state, action ) => {
        state.data = action.payload.sections;
        state.dictionary = action.payload.dictionary;
        state.loading = false;
      })

      .addCase(addToPrefers.pending, ( state ) => { state.loading = true })
      .addCase(addToPrefers.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload.sections;
        state.dictionary = action.payload.dictionary;
      })

      .addCase(delToPrefers.pending, ( state ) => { state.loading = true })
      .addCase(delToPrefers.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload.sections;
        state.dictionary = action.payload.dictionary;
      })
  }
});

export const { 
  onSearch, clearSearch, onContextMenu, offContextMenu, onNotification, offNotification, onFastAccess, onFastShow
} = primarypageSlice.actions;

export const mainpage     = ( state ) => state.primaripage.data;
export const dictionary   = ( state ) => state.primaripage.dictionary;
export const loading      = ( state ) => state.primaripage.loading;
export const search       = ( state ) => state.primaripage.search;
export const filtred      = ( state ) => state.primaripage.filtred;
export const contextMenu  = ( state ) => state.primaripage.contextMenu;
export const notification = ( state ) => state.primaripage.notification;
export const fastaccess   = ( state ) => state.primaripage.fastaccess;
export const fastshow     = ( state ) => state.primaripage.fastshow;

export default primarypageSlice.reducer;
