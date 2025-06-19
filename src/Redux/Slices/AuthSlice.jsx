import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    rollNumber: '',
    userType: '',
    grade: '',
    section: '',
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { name, rollNumber, userType, grade, section } = action.payload;
            state.name = name;
            state.rollNumber = rollNumber;
            state.userType = userType;
            state.grade = grade;
            state.section = section;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            return initialState;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
