import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserLang, getRemoteUser } from './userSliceAPI';

const initialState = {
  loading: false,
  data: [],
}

export const getRemote  = createAsyncThunk( 'user/getRemote', async () => await getRemoteUser({}) )
export const getUser    = createAsyncThunk( 'user/getUser', async ( data ) => await getUserData(data) )
export const setLang    = createAsyncThunk( 'user/setLang', async ( data ) => await setUserLang(data) )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // updateTimeout: (state) => {
    //   setTimeout(() => state.timeout = true, 15*1000)
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRemote.pending, ( state ) => { state.loading = true })
      .addCase(getRemote.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(setLang.pending, ( state ) => { state.loading = true })
      .addCase(setLang.fulfilled, ( state, action ) => {
        state.data.lang = action.payload;
        state.loading = false;
      })
  }
});

// export const {
//   updateTimeout
// } = userSlice.actions;

export const loading  = ( state ) => state.user.loading;
export const user     = ( state ) => state.user.data;
export const timeout  = ( state ) => state.user.timeout;


export default userSlice.reducer;
