import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from './userSliceAPI';

const initialState = {
  loading: false,
  data: [],
  lang: 'ru',
}

export const getUser = createAsyncThunk( 'user/getUser', async ( lang ) => await getUserData(lang) )

export const userSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = state.lang === 'ru' ? 'en' : 'ru';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, ( state ) => { state.loading = true })
      .addCase(getUser.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
      })


  }
});

export const {
  changeLang
} = userSlice.actions;

export const loading  = ( state ) => state.user.loading;
export const user     = ( state ) => state.user.data;
export const lang     = ( state ) => state.user.lang;


export default userSlice.reducer;
