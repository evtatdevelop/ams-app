import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpage } from './assetsSliceAPI';

const initialState = {
  loading: false,
  lang: 'ru',
  data: [],
}

export const getDataAsync = createAsyncThunk( 'assets/getMainpage', async ( lang ) => await getMainpage(lang) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = state.lang === 'ru' ? 'en' : 'ru';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, ( state ) => { state.loading = true })
      .addCase(getDataAsync.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
      })


  }
});

export const { 
  changeLang
} = mainpageSlice.actions;

export const data     = ( state ) => state.mainpage.data;
export const loading  = ( state ) => state.mainpage.loading;
export const lang     = ( state ) => state.mainpage.lang;

export default mainpageSlice.reducer;
