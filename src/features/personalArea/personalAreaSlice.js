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
  filters: {},
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
      state.filters = {};
      switchPage(state, {}) 
    },

    everyOpenClose: (state) => {
      state.everyClose = !state.everyClose
    },

    setSearchNum:  (state, action) => {
      const filters = {searchNum: action.payload, searchDate: state.filters.searchDate ? Array.from(state.filters.searchDate) : null}
      state.filters.searchNum = action.payload
      if ( action.payload ) state.everyClose = false; else if (!state.filters.searchDate) state.everyClose = true;
      switchPage(state, filters)      
    },

    setSearchDate:  (state, action) => {
      const filters = {searchNum: state.filters.searchNum, searchDate: action.payload ? Array.from(action.payload) : null}
      state.filters.searchDate = action.payload 
      if ( action.payload ) state.everyClose = false; else if (!state.filters.searchNum) state.everyClose = true;
      switchPage(state, filters)    
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyorders.pending, ( state ) => { state.loading = true })
      .addCase(getMyorders.fulfilled, ( state, action ) => {
        state.myorders = action.payload;
        if ( state.page === 'myorders' ) state.sorted = dateSorting(action.payload, {});
        state.loading = false;
      })

      .addCase(getMyarchive.pending, ( state ) => { state.loading = true })
      .addCase(getMyarchive.fulfilled, ( state, action ) => {
        state.myarchive = action.payload;
        if ( state.page === 'myagree_arch' ) state.sorted = dateSorting(action.payload, {})      
        state.loading = false;
      })

      .addCase(getMyexecarch.pending, ( state ) => { state.loading = true })
      .addCase(getMyexecarch.fulfilled, ( state, action ) => {
        state.nyexecarch = action.payload;
        if ( state.page === 'myexec_arch' ) state.sorted = dateSorting(action.payload, {});
        state.loading = false;
      })
  }
});

export const {
  setPage, everyOpenClose, setSearchNum, setSearchDate
} = personalareaSlice.actions;

export const myorders = ( state ) => state.personalarea.myorders;
export const myarchive = ( state ) => state.personalarea.myarchive;
export const loading  = ( state ) => state.personalarea.loading;
export const sorted  = ( state ) => state.personalarea.sorted;
export const everyClose  = ( state ) => state.personalarea.everyClose;
export const page  = ( state ) => state.personalarea.page;
export const filters  = ( state ) => state.personalarea.filters;


export default personalareaSlice.reducer;

const dataFltering = (orders, filters) => {
  let result = orders
  if ( filters.searchNum ) result = orders.filter(order => order.request_number.includes(filters.searchNum))
  if ( filters.searchDate && filters.searchDate.length === 2 ) result = result.filter(order => {
    const dtOpnArr = [...order.date_open.split(' ')[0].split('.'), ...order.date_open.split(' ')[1].split(':')]
    const date_open = `${dtOpnArr[2]}-${dtOpnArr[1]}-${dtOpnArr[0]}`
    if ( new Date(Date.parse(date_open)) >= new Date(Date.parse(filters.searchDate[0])) && new Date(Date.parse(date_open)) <= new Date(Date.parse(filters.searchDate[1])) )
    return order
  })
  return result
}

const switchPage = (state, filters) => {
  switch ( state.page ) {
    case 'myorders': state.sorted = dateSorting(state.myorders, filters); break;
    case 'myagree_arch': state.sorted = dateSorting(state.myarchive, filters); break;
    case 'myexecarch': state.sorted = dateSorting(state.nyexecarch, filters); break;
    default: state.sorted = []
  }
} 

const dateSorting = (orders, filters) => {
  const uniqDates = new Set();
  dataFltering(orders, filters).map(order => uniqDates.add(order.sort_order))
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