import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyordersData, getMyarchiveData, getMyexecarchData, getMyexecData  } from './lkSliceAPI';

const initialState = {
  loading: false,
  page: '',
  myorders: [],
  myarchive: [],
  nyexecarch: [],
  myexec: [],
  sorted: [],
  filters: {},
  orderTypes: [],
  orderUsers: [],
}

export const getMyorders = createAsyncThunk( 'lk/getMyorders', async (api_key) => await getMyordersData({'api_key': api_key}) )
export const getMyarchive = createAsyncThunk( 'lk/getMyarchive', async (api_key) => await getMyarchiveData({'api_key': api_key}) )
export const getMyexecarch = createAsyncThunk( 'lk/getMyexecarch', async (api_key) => await getMyexecarchData({'api_key': api_key}) )
export const getMyexec = createAsyncThunk( 'lk/getMyexec', async (api_key) => await getMyexecData({'api_key': api_key}) )

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

    setSearchDateFrom: (state, action) => {
      const filters = {...state.filters, searchDateFrom: action.payload ? action.payload : null}
      state.filters.searchDateFrom = action.payload 
      switchPage(state, filters)    
    },
    setSearchDateTo: (state, action) => {
      const filters = {...state.filters, searchDateTo: action.payload ? action.payload : null}
      state.filters.searchDateTo = action.payload 
      switchPage(state, filters)    
    },
    setSearchType: (state, action) => {
      const filters = {...state.filters, searchType: action.payload ? action.payload : null}
      state.filters.searchType = action.payload 
      switchPage(state, filters)    
    },

    setSearchUser: (state, action) => {
      const filters = {...state.filters, searchUser: action.payload ? action.payload : null}
      state.filters.searchUser = action.payload 
      switchPage(state, filters)    
    },
    
    clearSearch: (state) => {
      state.filters = {}
      switchPage(state, {}) 
    },

    setOrderDateFrom: (state, action) => {
      const filters = {...state.filters, searchOrderFrom: action.payload ? action.payload : null}
      state.filters.searchOrderFrom = action.payload 
      switchPage(state, filters)    
    },

    setOrderDateTo: (state, action) => {
      const filters = {...state.filters, searchOrderTo: action.payload ? action.payload : null}
      state.filters.searchOrderTo = action.payload 
      switchPage(state, filters)    
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
          state.orderUsers = getOrderUsers(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyarchive.pending, ( state ) => { state.loading = true })
      .addCase(getMyarchive.fulfilled, ( state, action ) => {
        state.myarchive = action.payload;
        if ( state.page === 'myagree_arch' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
          state.orderUsers = getOrderUsers(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyexecarch.pending, ( state ) => { state.loading = true })
      .addCase(getMyexecarch.fulfilled, ( state, action ) => {
        state.nyexecarch = action.payload;
        if ( state.page === 'myexec_arch' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
          state.orderUsers = getOrderUsers(action.payload);
        }
        state.loading = false;
      })

      .addCase(getMyexec.pending, ( state ) => { state.loading = true })
      .addCase(getMyexec.fulfilled, ( state, action ) => {

        // action.payload[0].order_dates = '';

        state.myexec = action.payload;
        if ( state.page === 'myexec' ) {
          state.sorted = dateSorting(action.payload, {});
          state.orderTypes = getOrderTypes(action.payload);
          state.orderUsers = getOrderUsers(action.payload);
          // console.log(action.payload);
          
        }
        state.loading = false;
      })
  }
});

export const {
  setPage, everyOpenClose, setSearchNum, setSearchDateFrom, setSearchDateTo, setSearchStat, clearSearch, setSearchType, setSearchUser, setOrderDateFrom, setOrderDateTo
} = lkSlice.actions;

export const myorders = ( state ) => state.lk.myorders;
export const myarchive = ( state ) => state.lk.myarchive;
export const loading  = ( state ) => state.lk.loading;
export const sorted  = ( state ) => state.lk.sorted;
export const page  = ( state ) => state.lk.page;
export const filters  = ( state ) => state.lk.filters;
export const orderTypes  = ( state ) => state.lk.orderTypes;
export const orderUsers  = ( state ) => state.lk.orderUsers;


export default lkSlice.reducer;



const dataFltering = (orders, filters) => {
  let result = orders

  if ( filters.searchNum ) result = orders.filter(order => order.request_number.includes(filters.searchNum))
  
  if ( filters.searchDateFrom ) {
    const dateResult = []
    result.forEach(order => {
      const dtOpnArr = [...order.date_open.split(' ')[0].split('.'), ...order.date_open.split(' ')[1].split(':')]
      const date_open = `${dtOpnArr[2]}-${dtOpnArr[1]}-${dtOpnArr[0]}`
      if ( new Date(Date.parse(date_open)) >= new Date(Date.parse(filters.searchDateFrom)) )
      dateResult.push(order)
    })
    result = dateResult;
  }
  
  if ( filters.searchDateTo ) {
    const dateResult = []
    result.forEach(order => {
      const dtOpnArr = [...order.date_open.split(' ')[0].split('.'), ...order.date_open.split(' ')[1].split(':')]
      const date_open = `${dtOpnArr[2]}-${dtOpnArr[1]}-${dtOpnArr[0]}`
      if ( new Date(Date.parse(date_open)) <= new Date(Date.parse(filters.searchDateTo)) )
      dateResult.push(order)
    })
    result = dateResult;
  }

  if ( filters.searchType ) {
    const serchStrs = filters.searchType.split('-');
    result = result.filter(order => !serchStrs[1] ? order.order_type === filters.searchType : order.api_system.system_prefix === serchStrs[1] )
  }

  if ( filters.searchUser ) {
    result = result.filter(order => order.api_order_user ? order.api_order_user.name.includes(filters.searchUser) : null )
  }

  if ( filters.searchOrderFrom ) {
    const dateResult = []
    result.forEach(order => {
      const dateTripStart =  order['order_dates']?.split('с')[1]?.split('<')[0]?.trim()?.split('.');
      if ( dateTripStart ) {
        const date_open = `${dateTripStart[2]}-${dateTripStart[1]}-${dateTripStart[0]}`
        // console.log(date_open);
        // console.log(filters.searchOrderFrom);
        if ( new Date(Date.parse(date_open)) >= new Date(Date.parse(filters.searchOrderFrom)) )
        dateResult.push(order)        
      }

    })
    result = dateResult;
    // console.log(result);
  }

  if ( filters.searchOrderTo ) {
    const dateResult = []
    result.forEach(order => {
      // const dateTripStart =  order['order_dates']?.split('по')[1]?.trim()?.split('.');
      const dateTripStart =  order['order_dates']?.split('с')[1]?.split('<')[0]?.trim()?.split('.');
      if ( dateTripStart ) {
        const date_open = `${dateTripStart[2]}-${dateTripStart[1]}-${dateTripStart[0]}`
        // console.log(date_open);
        // console.log(filters.searchOrderTo);
        if ( new Date(Date.parse(date_open)) <= new Date(Date.parse(filters.searchOrderTo)) )
        dateResult.push(order)        
      }

    })
    result = dateResult;
    // console.log(result);
  }

  return result
}


const dateSorting = (orders, filters) => {

  return dataFltering(orders, filters);
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

  // console.log(result);

  return result
}

const getOrderUsers = orders => {
  const set = new Set()
  const result = [];
  orders.forEach((order, index) => {
    if ( order.api_order_user ) {
      let namearr = order.api_order_user.name.split(' ')
      if ( !set.has(order.api_order_user.name) ) result.push({
        'email': null,
        'first_name': namearr[1],
        'id': index,
        'last_name': namearr[0],
        'middle_name': namearr[2]
      })
      set.add(order.api_order_user.name)      
    }

  });

  return result
}

const switchPage = (state, filters) => {
  switch ( state.page ) {
    case 'myorders': 
      state.sorted = dateSorting(state.myorders, filters);
      state.orderTypes = getOrderTypes(state.myorders);
      break;
    case 'myagree_arch': 
      state.sorted = dateSorting(state.myarchive, filters);
      state.orderTypes = getOrderTypes(state.myarchive);
      break;
    case 'myexec_arch': 
      state.sorted = dateSorting(state.nyexecarch, filters);
      state.orderTypes = getOrderTypes(state.nyexecarch);
      break;
    case 'myexec': 
      state.sorted = dateSorting(state.myexec, filters);
      state.orderTypes = getOrderTypes(state.myexec);
      break;
    default: state.sorted = []
  }
} 