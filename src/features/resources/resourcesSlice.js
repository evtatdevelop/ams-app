import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServersData } from "./resourcesSliceAPI";

const initialState = {
  loading: false,
  servers: [],
}

export const getServers = createAsyncThunk( 'mainpage/getServers', async (api_key) => await getServersData({'api_key': api_key}) )

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getServers.pending, ( state ) => { state.loading = true })
      .addCase(getServers.fulfilled, ( state, action ) => {
        state.loading = false;
        state.servers = action.payload;
      })

  }
});

// export const { 
// } = resourcesSlice.actions;

export const servers   = ( state ) => state.resources.servers;
export const loading    = ( state ) => state.resources.loading;

export default resourcesSlice.reducer;
