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
  export const getencoursAO = createAsyncThunk(
    "AO/getencoursAO",
    async (data: any, thunkAPI) => {
      const { rejectWithValue }= thunkAPI;
      try {
        const { idproduit, ...otherData } = data;
        console.log("Payload being sent:", otherData); // Log the payload

       const response = await axios.get(`http://localhost:9999/AO/getAOproduit/${idproduit}`, otherData);
        console.log(response.data);
       return response.data
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getalletseAO = createAsyncThunk(
    "AO/getallAO",
    async (data: any, thunkAPI) => {
      const { rejectWithValue }= thunkAPI;
      try {
        const { idetse, ...otherData } = data;

       const response = await axios.get(`http://localhost:9999/AO/getallAO/${idetse}`, otherData);
        console.log(response.data);
       return response.data
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );




export const getalletseAOExport = createSlice({
    name: "getallAO",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getalletseAO.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getalletseAO.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(getalletseAO.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
  });
  
  
  
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

  
  
  

export const getencoursAOExport = createSlice({
  name: "getencoursAO",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getencoursAO.pending, (state) => {
              state.status = 'loading';
              state.error = null;
          })
          .addCase(getencoursAO.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.record = action.payload;
          })
          .addCase(getencoursAO.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
  },
});







  