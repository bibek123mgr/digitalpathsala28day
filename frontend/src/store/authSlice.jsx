import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    error: null,
    message: null,
    loading: false,
    user: null,
    users: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.message = action.payload.message;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.users = [];
            state.message = 'Logged out';
            state.error = null;
            state.loading = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUsers,
    addUser,
    removeUser,
    updateUser,
} = authSlice.actions;

export default authSlice.reducer;

export const login = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {

        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();

        console.log(data);

        dispatch(loginSuccess({
            token: data.token,
            message: data.message
        }));
        localStorage.setItem('token', data.token);
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const getMyProfile = () => async (dispatch) => {
    dispatch(loginStart());

    try {
        const token = localStorage.getItem('token');

        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            dispatch(logout());
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const data = await response.json();

        dispatch(loginSuccess({
            token,
            user: data.user,
        }));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const getAllUsers = () => async (dispatch) => {
    dispatch(loginStart()); // Using loginStart to set loading state
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/v1/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });

        if (response.status === 401) {
            dispatch(logout());
            throw new Error('Unauthorized - Please login again');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        dispatch(setUsers(data.users || data)); // Assuming the response contains users array
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const createUser = (userData) => async (dispatch) => {
    dispatch(loginStart()); // Using loginStart to set loading state
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/v1/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        if (response.status === 401) {
            dispatch(logout());
            throw new Error('Unauthorized - Please login again');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        const data = await response.json();

        dispatch(loginSuccess({ message: 'User created successfully' }));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};