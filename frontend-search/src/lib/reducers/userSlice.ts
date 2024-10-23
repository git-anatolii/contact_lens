import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInputType, SignUpInputType, User } from '@utils/types';
import { userRegister, userLogin, tokenLogin } from '../api/userApi';

export const registerUser = createAsyncThunk<
  User,
  SignUpInputType,
  { rejectValue: string }
>(
  'auth/registerUser',
  async (userSignUpData: SignUpInputType, { rejectWithValue }) => {
    try {
      const data = await userRegister(userSignUpData);
      return data;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  LoginInputType,
  { rejectValue: string }
>(
  'auth/loginUser',
  async (userLoginData: LoginInputType, { rejectWithValue }) => {
    try {
      const data = await userLogin(userLoginData);
      if (userLoginData.remember_me) {
        sessionStorage.setItem('token', data.access_token);
      }
      localStorage.setItem('token', data.access_token);
      return data?.user;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const tokenLoginUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/tokenLogin', async (_, { rejectWithValue }) => {
  try {
    const data = await tokenLogin();
    return data;
  } catch (err) {
    return rejectWithValue(err as string);
  }
});

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (
    { tokenId, profileObj }: { tokenId: string; profileObj: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/auth/google', {
        tokenId,
        profileObj,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to login with Google');
    }
  }
);

interface InitialState {
  user: User;
  loading: boolean;
  success: boolean;
  error: string;
  isAuthorized: boolean;
}

const initialState: InitialState = {
  user: {
    id: '',
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  loading: false,
  success: false,
  error: '',
  isAuthorized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem('token');
      state.user = initialState.user;
      state.isAuthorized = false;
      state.error = '';
    },
    restoreError: (state) => {
      state.error ='';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(tokenLoginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(tokenLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(tokenLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export const { logOutUser, restoreError } = userSlice.actions;

export default userSlice.reducer;
