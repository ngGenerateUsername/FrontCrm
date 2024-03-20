import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Commande {
    // define your record type here
}
interface State {
    record: Commande[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};
export const AddLDC = createAsyncThunk(
    "Commande/AddLdc",
    async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        // Use idProduit directly from the argument list
        const { idProduit, ...otherData } = data;
        const response = await axios.post(`http://localhost:9999/api/Lignedecommande/AddLDC/${idProduit}`, otherData);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
/************************ AddLdc ***********************/
export const   AddLDCExport  = createSlice({
    name: "AddLDC",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddLDC.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddLDC.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddLDC.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
