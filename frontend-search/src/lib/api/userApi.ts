import axios from 'axios';
import { http } from './http';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { LoginInputType, SignUpInputType } from '@utils/types';

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const userRegister = async (userSignUpData: SignUpInputType) => {
  const url = API_ENDPOINTS.REGISTER;
  const body = userSignUpData;

  try {
    const response = await axiosApi.post(url, body);
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const userLogin = async (userLoginData: LoginInputType) => {
  const url = API_ENDPOINTS.LOGIN;
  const body = userLoginData;

  try {
    const response = await axiosApi.post(url, body);
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const googleLogin = async (code: string) => {
  const url = API_ENDPOINTS.GOOGLE_LOGIN_CALLBACK;

  try {
    const response = await axiosApi.get(url, { params: { code: code } });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
}

export const tokenLogin = async () => {
  const url = API_ENDPOINTS.TOKEN_LOGIN;
  try {
    const response = await http.post(url);
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};
