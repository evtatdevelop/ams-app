import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData  } from './personalAreaSliceAPI';

const initialState = {
  loading: false,
  data: [],
  sorted: [],
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
        state.sorted = dateSorting(action.payload);
        state.loading = false;
      })
  }
});

export const { 
  onSearch, clearSearch,
} = personalareaSlice.actions;

export const myorders = ( state ) => state.personalarea.data;
export const loading  = ( state ) => state.personalarea.loading;
export const sorted  = ( state ) => state.personalarea.sorted;


export default personalareaSlice.reducer;


const dateSorting = (orders) => {
  const uniqDates = new Set();
  orders.map(order => uniqDates.add(order.sort_order))
  const days = [...Array.from(uniqDates).map(date => {
    return{[new Date(date).getTime()]: [...orders.filter(order => order.sort_order === date)]}
  })]

  const uniqYears = new Set();
  days.map(day => uniqYears.add(new Date(+Object.keys(day)[0]).getFullYear()))
  const years = [...Array.from(uniqYears).map(year => {
    return{[year]: [...days.filter(day => new Date(+Object.keys(day)[0]).getFullYear() === year)]}
  })]

  return years.map(year => {
    const uniqMonths = new Set();
    Object.values(year)[0].map( order => uniqMonths.add(new Date(+Object.keys(order)[0]).getMonth() )) 
    return {
      [Object.keys(year)[0]]: 
      [...Array.from(uniqMonths).map(month => {
        return{[month]: [...Object.values(year)[0].filter(day => new Date(+Object.keys(day)[0]).getMonth() === month)]}
      })]
    }
  })
}