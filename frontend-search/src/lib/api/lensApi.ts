import { http } from './http';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { LensSearchPayload } from '@utils/types';

export const getAllSoftLens = async (payload: LensSearchPayload) => {
  const url = API_ENDPOINTS.GET_ALL_SOFT_LENS;
  try {
    const response = await http.get(url, {
      params: {
        limit: payload.limit,
        offset: payload.offset,
      },
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const getAllGasPermeableLens = async (payload: LensSearchPayload) => {
  const url = API_ENDPOINTS.GET_ALL_GAS_PERMEABLE_LENS;
  try {
    const response = await http.get(url, {
      params: {
        limit: payload.limit,
        offset: payload.offset,
      },
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const getAllHybridLens = async (payload: LensSearchPayload) => {
  const url = API_ENDPOINTS.GET_ALL_HYBRID_LENS;
  try {
    const response = await http.get(url, {
      params: {
        limit: payload.limit,
        offset: payload.offset,
      },
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const getAllMaterial = async (payload: LensSearchPayload) => {
  const url = API_ENDPOINTS.GET_ALL_MATERIAL;
  try {
    const response = await http.get(url, {
      params: {
        limit: payload.limit,
        offset: payload.offset,
      },
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};

export const getAllLensProduct = async (payload: LensSearchPayload) => {
  const url = API_ENDPOINTS.GET_ALL_LENS_PRODUCT;
  try {
    const response = await http.get(url, {
      params: {
        limit: payload.limit,
        offset: payload.offset,
      },
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data.detail;
  }
};
