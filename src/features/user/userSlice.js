import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserLang } from './userSliceAPI';

const initialState = {
  loading: false,
  data: [],
}

export const getUser = createAsyncThunk( 'user/getUser', async () => await getUserData() )
export const setLang = createAsyncThunk( 'user/setLang', async ( data ) => await setUserLang(data) )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // changeLang: (state, action) => {
    //   // state.data.lang = state.data.lang === 'RU' ? 'EN' : 'RU';
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, ( state ) => { state.loading = true })
      .addCase(getUser.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(setLang.pending, ( state ) => { state.loading = true })
      .addCase(setLang.fulfilled, ( state, action ) => {
        // console.log(action.payload);
        state.data.lang = state.data.lang === 'RU' ? 'EN' : 'RU';
        state.loading = false;
      })
  }
});

export const {
  changeLang
} = userSlice.actions;

export const loading  = ( state ) => state.user.loading;
export const user     = ( state ) => state.user.data;


export default userSlice.reducer;
