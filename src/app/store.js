import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import mainpageReducer from '../features/mainpage/mainpageSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    mainpage: mainpageReducer,
  },
});
