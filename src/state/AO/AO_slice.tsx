import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import thunk from "redux-thunk";
interface AppellOffre {
    // define your record type here
}
interface State {
    record: AppellOffre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};


export const ADDAO = createAsyncThunk(
    "Commande/getreclamation",
    async (data: any, thunkAPI) => {
      const { rejectWithValue }= thunkAPI;
      try {
        const { idproduit, ...otherData } = data;
        console.log("Payload being sent:", otherData); // Log the payload

       const response = await axios.post(`http://localhost:9999/AO/ADDAO/${idproduit}`, otherData);
        console.log(response.data);
       return response.data
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );




export const ADDAOExport = createSlice({
    name: "ADDAO",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ADDAO.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(ADDAO.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ADDAO.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
  });
  
  
  
  
  
  
  