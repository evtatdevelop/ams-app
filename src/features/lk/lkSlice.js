import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData, getMyarchiveData, getMyexecarchData  } from './lkSliceAPI';

const initialState = {
  loading: false,
  page: '',
  myorders: [],
  myarchive: [],
  nyexecarch: [],
  sorted: [],
  filters: {},
}

export const getMyorders = createAsyncThunk( 'lk/getMyorders', async (api_key) => await getMyordersData({'api_key': api_key}) )
export const getMyarchive = createAsyncThunk( 'lk/getMyarchive', async (api_key) => await getMyarchiveData({'api_key': api_key}) )
export const getMyexecarch = createAsyncThunk( 'lk/getMyexecarch', async (api_key) => await getMyexecarchData({'api_key': api_key}) )

export const lkSlice = createSlice({
  name: 'lk',
  initialState,
  reducers: {

    setPage: (state, action) => { 
      state.page = action.payload;
      state.filters = {};
      switchPage(state, {}) 
    },

    setSearchNum: (state, action) => {
      const filters = {...state.filters, searchNum: action.payload}
      state.filters.searchNum = action.payload
      switchPage(state, filters)      
    },

    setSearchDate: (state, action) => {
      const filters = {...state.filters, searchDate: action.payload ? Array.from(action.payload) : null}
      state.filters.searchDate = action.payload 
      switchPage(state, filters)    
    },

    clearSearch: (state) => {
      console.log('clearSearch');
      state.filters = {}
      switchPage(state, {}) 
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyorders.pending, ( state ) => { state.loading = true })
      .addCase(getMyorders.fulfilled, ( state, action ) => {
        state.myorders = action.payload;
        if ( state.page === 'myorders' ) {
          state.sorted = dateSorting(action.payload, {});
        }
        state.loading = false;
      })

      .addCase(getMyarchive.pending, ( state ) => { state.loading = true })
      .addCase(getMyarchive.fulfilled, ( state, action ) => {
        state.myarchive = action.payload;
        if ( state.page === 'myagree_arch' ) {
          state.sorted = dateSorting(action.payload, {});
        }
        state.loading = false;
      })

      .addCase(getMyexecarch.pending, ( state ) => { state.loading = true })
      .addCase(getMyexecarch.fulfilled, ( state, action ) => {
        state.nyexecarch = action.payload;
        if ( state.page === 'myexec_arch' ) {
          state.sorted = dateSorting(action.payload, {});
        }
        state.loading = false;
      })
  }
});

export const {
  setPage, everyOpenClose, setSearchNum, setSearchDate, setSearchStat, clearSearch
} = lkSlice.actions;

export const myorders = ( state ) => state.lk.myorders;
export const myarchive = ( state ) => state.lk.myarchive;
export const loading  = ( state ) => state.lk.loading;
export const sorted  = ( state ) => state.lk.sorted;
export const page  = ( state ) => state.lk.page;
export const filters  = ( state ) => state.lk.filters;


export default lkSlice.reducer;



const dataFltering = (orders, filters) => {
  let result = orders

  if ( filters.searchNum ) result = orders.filter(order => order.request_number.includes(filters.searchNum))
  
  if ( filters.searchDate && filters.searchDate.length === 2 ) {
    const dateResult = []
    result.forEach(order => {
      const dtOpnArr = [...order.date_open.split(' ')[0].split('.'), ...order.date_open.split(' ')[1].split(':')]
      const date_open = `${dtOpnArr[2]}-${dtOpnArr[1]}-${dtOpnArr[0]}`
      if ( new Date(Date.parse(date_open)) >= new Date(Date.parse(filters.searchDate[0])) && new Date(Date.parse(date_open)) <= new Date(Date.parse(filters.searchDate[1])) )
      dateResult.push(order)
    })
    result = dateResult;
  }

  return result
}


const dateSorting = (orders, filters) => {
  
  return dataFltering(orders, filters);

}


const switchPage = (state, filters) => {
  switch ( state.page ) {
    case 'myorders': 
      state.sorted = dateSorting(Array.from(state.myorders), filters);
      break;
    case 'myagree_arch': 
      state.sorted = dateSorting(Array.from(state.myarchive), filters);
      break;
    case 'myexecarch': 
      state.sorted = dateSorting(Array.from(state.nyexecarch), filters);
      break;
    default: state.sorted = []
  }
} 