import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

interface File {}
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

export const JsonToExel = createAsyncThunk(
  "JsonToExel",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `http://localhost:4001/api/JsonToExel`,
        data
      );
      console.log(data);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      // Save the file using FileSaver.js
      FileSaver.saveAs(blob, "data.xlsx");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const JsonToCsv = createAsyncThunk(
  "JsonToExel",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `http://localhost:4001/api/JsonToCsv`,
        data
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Export.csv");
      document.body.appendChild(link);
      link.click();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const JsonToExelExport = createSlice({
  name: "JsonToExelExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /************************ Upload file ***********************/
      .addCase(JsonToExel.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(JsonToExel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(JsonToExel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
