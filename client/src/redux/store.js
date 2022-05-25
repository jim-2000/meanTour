import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slice/authSlice';
import TourSlice from './slice/tourSlice';
//

export default configureStore({
    reducer: {
        auth: AuthSlice,
        tour:TourSlice,
    },
});