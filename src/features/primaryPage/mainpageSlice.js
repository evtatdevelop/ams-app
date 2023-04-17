import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpageData } from './mainpageSliceAPI';

const initialState = {
  loading: false,
  data: [],
  dictionary: [],
  search: '',
  filtred: [],
  contextMenu: {},
}

export const getMainpage = createAsyncThunk( 'primarypage/getMainpage', async (api_key) => await getMainpageData({'api_key': api_key}) )

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
    },

    onContextMenu: (state, action) => {
      state.contextMenu = action.payload
    },
    
    offContextMenu: (state) => {
      state.contextMenu = {}
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMainpage.pending, ( state ) => { state.loading = true })
      .addCase(getMainpage.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload.sections;
        state.dictionary = action.payload.dictionary;
      })

  }
});

export const { 
  onSearch, clearSearch, onContextMenu, offContextMenu
} = primarypageSlice.actions;

export const mainpage     = ( state ) => state.primaripage.data;
export const dictionary   = ( state ) => state.primaripage.dictionary;
export const loading      = ( state ) => state.primaripage.loading;
export const search       = ( state ) => state.primaripage.search;
export const filtred      = ( state ) => state.primaripage.filtred;
export const contextMenu  = ( state ) => state.primaripage.contextMenu;

export default primarypageSlice.reducer;
