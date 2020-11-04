import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/useSlice';
import appReducer from '../features/appSlice';

export default configureStore ({
    reducer:{
        user:userReducer,
        app:appReducer,
    }
})