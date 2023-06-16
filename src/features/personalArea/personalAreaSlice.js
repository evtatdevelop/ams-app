import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData, getMyarchiveData, getMyexecarchData  } from './personalAreaSliceAPI';

const initialState = {
  loading: false,
  page: '',
  myorders: [],
  myarchive: [],
  nyexecarch: [],
  sorted: [],
  everyClose: true,
}

export const getMyorders = createAsyncThunk( 'personalarea/getMyorders', async (api_key) => await getMyordersData({'api_key': api_key}) )
export const getMyarchive = createAsyncThunk( 'personalarea/getMyarchive', async (api_key) => await getMyarchiveData({'api_key': api_key}) )
export const getMyexecarch = createAsyncThunk( 'personalarea/getMyexecarch', async (api_key) => await getMyexecarchData({'api_key': api_key}) )

export const personalareaSlice = createSlice({
  name: 'personalarea',
  initialState,
  reducers: {

    setPage: (state, action) => { 
      state.page = action.payload;
      state.everyClose = true;
      switch ( action.payload ) {
        case 'myorders': state.sorted = dateSorting(state.myorders); break;
        case 'myagree_arch': state.sorted = dateSorting(state.myarchive); break;
        case 'myexecarch': state.sorted = dateSorting(state.nyexecarch); break;
        default: state.sorted = []
      } 
    },

    everyOpenClose: (state) => {
      state.everyClose = !state.everyClose
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyorders.pending, ( state ) => { state.loading = true })
      .addCase(getMyorders.fulfilled, ( state, action ) => {
        state.myorders = action.payload;
        if ( state.page === 'myorders' ) state.sorted = dateSorting(action.payload);
        state.loading = false;
      })

      .addCase(getMyarchive.pending, ( state ) => { state.loading = true })
      .addCase(getMyarchive.fulfilled, ( state, action ) => {
        state.myarchive = action.payload;
        if ( state.page === 'myagree_arch' ) state.sorted = dateSorting(action.payload)
        
        // ? NEEDS_TO_BE_RESOLVED: Dublicated orders in case of existing several agreements in one order at deffereht stages
        // dateSorting(action.payload).map(
        //   year => Object.values(year)[0].map(
        //     mont => Object.values(mont)[0].map(
        //       days => Object.values(days)[0].map(order => console.log(order)))))
        
        state.loading = false;
      })

      .addCase(getMyexecarch.pending, ( state ) => { state.loading = true })
      .addCase(getMyexecarch.fulfilled, ( state, action ) => {
        state.nyexecarch = action.payload;
        if ( state.page === 'myexec_arch' ) state.sorted = dateSorting(action.payload);
        state.loading = false;
      })
  }
});

export const {
  setPage, everyOpenClose
} = personalareaSlice.actions;

export const myorders = ( state ) => state.personalarea.myorders;
export const myarchive = ( state ) => state.personalarea.myarchive;
export const loading  = ( state ) => state.personalarea.loading;
export const sorted  = ( state ) => state.personalarea.sorted;
export const everyClose  = ( state ) => state.personalarea.everyClose;
export const page  = ( state ) => state.personalarea.page;


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