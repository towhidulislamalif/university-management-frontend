import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define the structure of the user object
export interface IUser {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

// Define the initial state for the 'auth' slice
interface IInitialState {
  user: IUser | null;
  token: string | null;
}

const initialState: IInitialState = {
  user: null,
  token: null,
};

// Create the 'auth' slice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to set user information in the state
    setUser: (
      state,
      action: PayloadAction<{ user: IUser | null; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // Reducer to clear user information on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector function to get the current user object from the state
export const useCurrentUser = (state: RootState) => state.auth.user;

// Selector function to get the current authentication token from the state
export const useCurrentToken = (state: RootState) => state.auth.token;
