import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpageData } from './mainpageSliceAPI';

const initialState = {
  loading: false,
  data: [],
  dictionary: [],
  search: '',
  filtred: [],
  hint: {}
}

export const getMainpage = createAsyncThunk( 'mainpage/getMainpage', async (api_key) => await getMainpageData({'api_key': api_key}) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
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

    onHint: (state, action) => {
      state.hint = action.payload
    },
    
    clearHint: (state) => {
      state.hint = {}
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
  onSearch, clearSearch, onHint, clearHint
} = mainpageSlice.actions;

export const mainpage   = ( state ) => state.mainpage.data;
export const dictionary = ( state ) => state.mainpage.dictionary;
export const loading    = ( state ) => state.mainpage.loading;
export const search     = ( state ) => state.mainpage.search;
export const filtred    = ( state ) => state.mainpage.filtred;
export const hint       = ( state ) => state.mainpage.hint;

export default mainpageSlice.reducer;
