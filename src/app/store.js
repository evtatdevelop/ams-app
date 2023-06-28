import { configureStore } from '@reduxjs/toolkit';
import mainpageReducer from '../features/mainpage/mainpageSlice';
import userReducer from '../features/user/userSlice'
import workplaceReducer from '../features/workplace/workplaceSlice'
import resourcesReducer from '../features/resources/resourcesSlice'
import primarypageReducer from '../features/primaryPage/mainpageSlice'
import personalareaReducer from "../features/personalArea/personalAreaSlice"
import lkReducer from "../features/lk/lkSlice"

export const store = configureStore({
  reducer: {
    mainpage: mainpageReducer,
    user: userReducer,
    workplace: workplaceReducer,
    resources: resourcesReducer,
    primarypage: primarypageReducer,
    personalarea: personalareaReducer,
    lk: lkReducer,
  },
});
