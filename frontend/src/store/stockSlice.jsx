// src/features/stock/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stocks: [],
    loading: false,
    error: null,
    message: null,
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        getStocksStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getStocksSuccess: (state, action) => {
            state.loading = false;
            state.stocks = action.payload;
        },
        getStocksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addStock: (state, action) => {
            state.stocks.push(action.payload);
        },
        updateStock: (state, action) => {
            const index = state.stocks.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.stocks[index] = action.payload;
            }
        },
        removeStock: (state, action) => {
            state.stocks = state.stocks.filter(s => s.id !== action.payload);
        },
        clearStocks: (state) => {
            state.stocks = [];
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        setStockMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const {
    getStocksStart,
    getStocksSuccess,
    getStocksFailure,
    addStock,
    updateStock,
    removeStock,
    clearStocks,
    setStockMessage,
} = stockSlice.actions;

export default stockSlice.reducer;


export const getAllStocks = () => async (dispatch) => {
    dispatch(getStocksStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/stocks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch stocks');
        }

        const data = await response.json();
        dispatch(getStocksSuccess(data));
    } catch (error) {
        dispatch(getStocksFailure(error.message));
    }
};

export const createStock = (stockData) => async (dispatch) => {
    dispatch(getStocksStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/stocks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: JSON.stringify(stockData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create stock');
        }

        const data = await response.json();
        dispatch(setStockMessage(data.message));
    } catch (error) {
        dispatch(getStocksFailure(error.message));
    }
};
