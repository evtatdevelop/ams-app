import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContractorsData } from "./workplaceSliceAPI";

const initialState = {
  loading: false,
  contractors: [],
}

export const getContractors = createAsyncThunk( 'mainpage/getContractors', async (api_key) => await getContractorsData({'api_key': api_key}) )

export const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContractors.pending, ( state ) => { state.loading = true })
      .addCase(getContractors.fulfilled, ( state, action ) => {
        state.loading = false;
        state.contractors = action.payload;
      })

  }
});

// export const { 
// } = workplaceSlice.actions;

export const contractors   = ( state ) => state.workplace.contractors;
export const loading    = ( state ) => state.workplace.loading;

export default workplaceSlice.reducer;
