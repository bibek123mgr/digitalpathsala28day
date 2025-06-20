// src/features/supplier/supplierSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    suppliers: [],
    comboboxSuppliers: [],
    loading: false,
    error: null,
    message: null,
};

// Create the slice
const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        getSuppliersStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        getSuppliersSuccess: (state, action) => {
            state.loading = false;
            state.suppliers = action.payload;
        },
        getSuppliersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addSupplier: (state, action) => {
            state.suppliers.push(action.payload);
        },
        updateSupplier: (state, action) => {
            const index = state.suppliers.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.suppliers[index] = action.payload;
            }
        },
        removeSupplier: (state, action) => {
            state.suppliers = state.suppliers.filter(s => s.id !== action.payload);
        },
        clearSuppliers: (state) => {
            state.suppliers = [];
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        setComboboxSupplier(state, action) {
            state.comboboxSuppliers = action.payload
        }
    },
});

// Export actions
export const {
    getSuppliersStart,
    getSuppliersSuccess,
    getSuppliersFailure,
    addSupplier,
    updateSupplier,
    removeSupplier,
    clearSuppliers,
    setMessage,
    setComboboxSupplier
} = supplierSlice.actions;

export default supplierSlice.reducer;


export const getAllSuppliers = () => async (dispatch) => {
    dispatch(getSuppliersStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/suppliers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch suppliers');
        }

        const data = await response.json();
        dispatch(getSuppliersSuccess(data));
    } catch (error) {
        dispatch(getSuppliersFailure(error.message));
    }
};

export const createSupplier = (supplierData) => async (dispatch) => {
    dispatch(getSuppliersStart());

    try {
        const response = await fetch('http://localhost:8080/api/v1/suppliers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: JSON.stringify(supplierData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create supplier');
        }
        const data = await response.json();
        dispatch(setMessage(data.message))
    } catch (error) {
        dispatch(getSuppliersFailure(error.message));
    }
};

export const getAllActiveSupplierForCombobox = () => async (dispatch) => {
    dispatch(getSuppliersStart());
    try {
        const response = await fetch('http://localhost:8080/api/v1/suppliers/combo-box', {
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
        dispatch(setComboboxSupplier(data));
    } catch (error) {
        dispatch(getSuppliersFailure(error.message));
    }
};