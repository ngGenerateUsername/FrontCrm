import { createSlice } from '@reduxjs/toolkit';

const downloadSlice = createSlice({
  name: 'download',
  initialState: {
    downloading: false,
    error: null,
  },
  reducers: {
    downloadFileStart: (state) => {
      state.downloading = true;
      state.error = null;
    },
    downloadFileSuccess: (state) => {
      state.downloading = false;
      state.error = null;
    },
    downloadFileFailure: (state, action) => {
      state.downloading = false;
      state.error = action.payload;
    },
  },
});

export const {
  downloadFileStart,
  downloadFileSuccess,
  downloadFileFailure,
} = downloadSlice.actions;

export default downloadSlice.reducer;
