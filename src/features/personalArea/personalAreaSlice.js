import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData, getMyarchiveData, getMyexecarchData, getMyagreeData } from './personalAreaSliceAPI';
import { getFrontStatus } from "../../helpers";

const initialState = {
  loading: false,
  page: '',
  myorders: [],
  myarchive: [],
  nyexecarch: [],
  myagree: [],
  sorted: [],
  everyClose: true,
  filters: {},
  orderTypes: [],
  orderInfo: {}
}

export const getMyorders = createAsyncThunk( 'personalarea/getMyorders', async (api_key) => await getMyordersData({'api_key': api_key}) )
export const getMyarchive = createAsyncThunk( 'personalarea/getMyarchive', async (api_key) => await getMyarchiveData({'api_key': api_key}) )
export const getMyexecarch = createAsyncThunk( 'personalarea/getMyexecarch', async (api_key) => await getMyexecarchData({'api_key': api_key}) )

export const getMyagree = createAsyncThunk( 'personalarea/getMyagreeData', async (api_key) => await getMyagreeData({'api_key': api_key}) )

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

    setSearchNum: (state, action) => {
      const filters = {...state.filters, searchNum: action.payload}
      state.filters.searchNum = action.payload
      if ( action.payload ) state.everyClose = false; else if (!state.filters.searchDate && !state.filters.searchNoStatus && !state.filters.searchType) state.everyClose = true;
      switchPage(state, filters)      
    },

    setSearchDate: (state, action) => {
      const filters = {...state.filters, searchDate: action.payload ? Array.from(action.payload) : null}
      state.filters.searchDate = action.payload 
      if ( action.payload ) state.everyClose = false; else if (!state.filters.searchNum && !state.filters.searchNoStatus && !state.filters.searchType) state.everyClose = true;
      switchPage(state, filters)    
    },

    setSearchStat: (state, action) => {
      let searchNoStatus = new Set();
      if ( state.filters.searchNoStatus ) searchNoStatus = new Set(state.filters.searchNoStatus); else searchNoStatus = new Set()
      if ( searchNoStatus.has(action.payload) ) searchNoStatus.delete(action.payload); else searchNoStatus.add(action.payload);
      state.filters.searchNoStatus = Array.from(searchNoStatus).length > 0 ? Array.from(searchNoStatus) : null;
      const filters = {...state.filters, searchStatus: Array.from(searchNoStatus) }
      if ( searchNoStatus.size !== 0 ) state.everyClose = false; else if (!state.filters.searchDate && !state.filters.searchNum && !state.filters.searchType) state.everyClose = true;
      switchPage(state, filters)    
    },

    setSearchType: (state, action) => {
      const filters = {...state.filters, searchType: action.payload ? action.payload : null}
      state.filters.searchType = action.payload 
      if ( action.payload ) state.everyClose = false; else if (!state.filters.searchDate && !state.filters.searchNum && !state.filters.searchNoStatus) state.everyClose = true;
      switchPage(state, filters)    
    },

    clearSearch: (state) => {
      state.filters = {}
      switchPage(state, {}) 
      state.everyClose = true;
    },

    showOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyorders.pending, ( state ) => { state.loading = true })
      .addCase(getMyorders.fulfilled, ( state, action ) => {
        state.myorders = action.payload;
        if ( state.page === 'myorders' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyarchive.pending, ( state ) => { state.loading = true })
      .addCase(getMyarchive.fulfilled, ( state, action ) => {
        state.myarchive = action.payload;
        if ( state.page === 'myagree_arch' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyexecarch.pending, ( state ) => { state.loading = true })
      .addCase(getMyexecarch.fulfilled, ( state, action ) => {
        state.nyexecarch = action.payload;
        if ( state.page === 'myexec_arch' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyagree.pending, ( state ) => { state.loading = true })
      .addCase(getMyagree.fulfilled, ( state, action ) => {
        state.myagree = action.payload;
        if ( state.page === 'myagree' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
        }
        state.loading = false;
      })
  }
});

export const {
  setPage, everyOpenClose, setSearchNum, setSearchDate, setSearchStat, clearSearch, setSearchType, showOrderInfo
} = personalareaSlice.actions;

// export const myorders = ( state ) => state.personalarea.myorders;
// export const myarchive = ( state ) => state.personalarea.myarchive;
export const loading  = ( state ) => state.personalarea.loading;
export const sorted  = ( state ) => state.personalarea.sorted;
export const everyClose  = ( state ) => state.personalarea.everyClose;
export const page  = ( state ) => state.personalarea.page;
export const filters  = ( state ) => state.personalarea.filters;
export const orderTypes  = ( state ) => state.personalarea.orderTypes;
export const orderInfo  = ( state ) => state.personalarea.orderInfo;


export default personalareaSlice.reducer;

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

  if ( filters.searchNoStatus && filters.searchNoStatus.length > 0 ) {
    const statusResult = []
    result.forEach(order => {
      if ( !filters.searchNoStatus.includes(getFrontStatus(order.api_status))  )
      statusResult.push(order)
    })
    result = statusResult;
  }

  if ( filters.searchType ) {
    const serchStrs = filters.searchType.split('-');
    result = result.filter(order => !serchStrs[1] ? order.order_type === filters.searchType : order.api_system.system_prefix === serchStrs[1] )
  }

  return result
}


const dateSorting = (orders, filters) => {
  const uniqDates = new Set();
  const sortedOrders =  dataFltering(orders, filters);
  sortedOrders.map(order => uniqDates.add(order.sort_order))
  const days = [...Array.from(uniqDates).map(date => {
    return{[new Date(date).getTime()]: [...sortedOrders.filter(order => order.sort_order === date)]}
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

const getOrderTypes = orders => {
  const set = new Set()
  const result = [];
  orders.forEach(order => {
    let id = order.order_type === 'CORPSYSTEMS' ? `${order.order_type}-${order.api_system.system_prefix}` : order.order_type
    if ( !set.has(id) ) result.push({
      'id': id, 
      'name': order.api_system.name,
      'name_en': order.api_system.name_en
    })
    set.add(id)
  });

  return result
}

const switchPage = (state, filters) => {
  switch ( state.page ) {
    case 'myorders': 
      state.sorted = dateSorting(Array.from(state.myorders), filters);
      break;
    case 'myagree_arch': 
      state.sorted = dateSorting(Array.from(state.myarchive), filters);
      break;
    case 'myexec_arch': 
      state.sorted = dateSorting(Array.from(state.nyexecarch), filters);
      break;
    case 'myagree': 
      state.sorted = dateSorting(Array.from(state.myagree), filters);
      break;
    default: state.sorted = []
  }
} 