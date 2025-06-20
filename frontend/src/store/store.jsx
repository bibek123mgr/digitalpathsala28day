import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/authSlice.jsx'
import supplierReducer from '../store/supplierSlice.jsx'
import productSlice from '../store/productSlice.jsx'
import stockSlice from '../store/stockSlice.jsx'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        supplier: supplierReducer,
        product: productSlice,
        stock: stockSlice
    },
})