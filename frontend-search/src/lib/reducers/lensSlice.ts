import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LensSearchPayload } from '@utils/types';
import {
  getAllGasPermeableLens,
  getAllHybridLens,
  getAllLensProduct,
  getAllMaterial,
  getAllSoftLens,
} from '../api/lensApi';

export const getAllSoftLensThunk = createAsyncThunk(
  'lens/soft-lens',
  async (payload: LensSearchPayload, { rejectWithValue }) => {
    try {
      const data = await getAllSoftLens(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const getAllGasPermeableLensThunk = createAsyncThunk(
  'lens/gas-permeable-lens',
  async (payload: LensSearchPayload, { rejectWithValue }) => {
    try {
      const data = await getAllGasPermeableLens(payload);
      return data?.gas_permeable_lens;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const getAllHybridLensThunk = createAsyncThunk(
  'lens/hybrid-lens',
  async (payload: LensSearchPayload, { rejectWithValue }) => {
    try {
      const data = await getAllHybridLens(payload);
      return data?.hybrid_lens;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const getAllMaterialThunk = createAsyncThunk(
  'lens/material',
  async (payload: LensSearchPayload, { rejectWithValue }) => {
    try {
      const data = await getAllMaterial(payload);
      return data?.hl_materials;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const getAllLensProductThunk = createAsyncThunk(
  'lens/lens-product',
  async (payload: LensSearchPayload, { rejectWithValue }) => {
    try {
      const data = await getAllLensProduct(payload);
      return data?.lens_product;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

const initialState = {
  softLens: [],
  gasPermeableLens: [],
  hybridLens: [],
  materials: [],
  lensProduct: [],
  total_count: 0,
  loading: false,
  error: '',
};

export const lensSlice = createSlice({
  name: 'lens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSoftLensThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllSoftLensThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.softLens = action.payload?.soft_lens;
        state.total_count = action.payload?.total_count;
      })
      .addCase(getAllSoftLensThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllGasPermeableLensThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllGasPermeableLensThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gasPermeableLens = action.payload;
      })
      .addCase(getAllGasPermeableLensThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllHybridLensThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllHybridLensThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gasPermeableLens = action.payload;
      })
      .addCase(getAllHybridLensThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllMaterialThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllMaterialThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gasPermeableLens = action.payload;
      })
      .addCase(getAllMaterialThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllLensProductThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllLensProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gasPermeableLens = action.payload;
      })
      .addCase(getAllLensProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lensSlice.reducer;
