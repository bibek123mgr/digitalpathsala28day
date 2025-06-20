// src/features/product/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    comboboxProducts: [],
    loading: false,
    error: null,
    message: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        getProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        clearProducts: (state) => {
            state.products = [];
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setComboboxProduct(state, action) {
            state.comboboxProducts = action.payload
        }
    },
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    addProduct,
    updateProduct,
    removeProduct,
    clearProducts,
    setMessage,
    setComboboxProduct
} = productSlice.actions;

export default productSlice.reducer;


export const getAllProducts = () => async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        dispatch(getProductsSuccess(data));
    } catch (error) {
        dispatch(getProductsFailure(error.message));
    }
};

export const getAllActiveProductsForCombobox = () => async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/products/combo-box', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        dispatch(setComboboxProduct(data));
    } catch (error) {
        dispatch(getProductsFailure(error.message));
    }
};

export const createProduct = (productData) => async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create product');
        }

        const data = await response.json();
        dispatch(setMessage(data.message));
    } catch (error) {
        dispatch(getProductsFailure(error.message));
    }
};
