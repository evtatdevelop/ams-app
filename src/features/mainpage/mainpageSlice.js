import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainpageData } from './mainpageSliceAPI';

const initialState = {
  loading: false,
  data: [],
  dictionary: [],
}

// export const getMainpage = createAsyncThunk( 'mainpage/getMainpage', async ( lang ) => await getMainpageData(lang) )
export const getMainpage = createAsyncThunk( 'mainpage/getMainpage', async () => await getMainpageData() )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
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

// export const { 
// } = mainpageSlice.actions;

export const mainpage   = ( state ) => state.mainpage.data;
export const dictionary = ( state ) => state.mainpage.dictionary;
export const loading    = ( state ) => state.mainpage.loading;

export default mainpageSlice.reducer;
