import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface File {
  // Define the properties of the File object if needed
}

interface State {
  record: File[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  record: [],
  status: "idle",
  error: null,
};

export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async (data: { form: FormData; id: string }, thunkAPI) => {
    const { form, id } = data;
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        `http://localhost:4020/uploadmultifile/${id}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default uploadSlice.reducer;
