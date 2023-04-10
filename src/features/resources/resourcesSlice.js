import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServersData } from "./resourcesSliceAPI";

const initialState = {
  loading: false,
  servers: [],
  phone: '',
  requestType: '',
}

export const getServers = createAsyncThunk( 'resources/getServers', async (api_key) => await getServersData({'api_key': api_key}) )

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    // setPhone: (state, action) => { 
    //   state.phone = action.payload 
    // },
    setReruestType: (state, action) => { 
      state.requestType = action.payload 
    },
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

export const { 
  setPhone, setReruestType
} = resourcesSlice.actions;

// export const applicantPhone = ( state ) => state.resources.applicantPhone;
export const servers = ( state ) => state.resources.servers;
export const loading = ( state ) => state.resources.loading;
export const requestType = ( state ) => state.resources.requestType;
export const phone = ( state ) => state.resources.phone;

export default resourcesSlice.reducer;
