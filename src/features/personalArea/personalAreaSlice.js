import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData  } from './personalAreaSliceAPI';

const initialState = {
  loading: false,
  data: [],
}

export const getMyorders = createAsyncThunk( 'personalarea/getMyorders', async (api_key) => await getMyordersData({'api_key': api_key}) )

export const personalareaSlice = createSlice({
  name: 'personalarea',
  initialState,
  reducers: {
    onSearch: (state, action) => { 
      state.search = action.payload 
    },

    clearSearch: (state) => { 
      state.search = '' 
      state.filtred = []
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyorders.pending, ( state ) => { state.loading = true })
      .addCase(getMyorders.fulfilled, ( state, action ) => {
        state.data = action.payload;
        state.loading = false;
      })
  }
});

export const { 
  onSearch, clearSearch,
} = personalareaSlice.actions;

export const myorders = ( state ) => state.personalarea.data;
export const loading  = ( state ) => state.personalarea.loading;


export default personalareaSlice.reducer;
